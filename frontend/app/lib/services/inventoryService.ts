import { getClientSafe } from './supabaseService';
import { Product, RawMaterial } from '../types';

export const inventoryService = {
  async getProducts(): Promise<Product[] | null> {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('products')
      .select('*, product_categories(id, name)')
      .eq('is_active', true)
      .order('name');

    if (error || !data) return null;

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      sku: item.code || `SKU-${item.id.slice(0, 6)}`,
      categoryId: item.product_categories?.id || 'c1',
      categoryName: item.product_categories?.name || 'Cireng',
      price: Number(item.selling_price),
      baseCost: Number(item.estimated_hpp || 0),
      unit: item.unit || 'porsi',
      stock: item.stock,
      minStock: item.min_stock,
      image: item.image_url || '/hero-cireng.png',
      isActive: item.is_active,
    }));
  },

  async getRawMaterials(): Promise<RawMaterial[] | null> {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('raw_materials')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error || !data) return null;

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code || `RM-${item.id.slice(0, 6)}`,
      unit: item.unit,
      stock: Number(item.stock),
      minStock: Number(item.min_stock),
      unitCost: Number(item.cost_per_unit || 0),
      supplierName: 'Pemasok Terdaftar',
    }));
  },

  async adjustStock(
    itemId: string,
    itemType: 'produk' | 'bahan_baku',
    itemName: string,
    quantityChange: number,
    unit: string,
    reason: string,
    userId?: string
  ) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const table = itemType === 'produk' ? 'products' : 'raw_materials';
    
    // Get current stock
    const { data: itemData, error: fetchErr } = await supabase
      .from(table)
      .select('stock')
      .eq('id', itemId)
      .single();

    if (fetchErr) throw fetchErr;

    const prevStock = Number(itemData.stock);
    const newStock = Math.max(0, prevStock + quantityChange);

    // Update stock
    const { error: updateErr } = await supabase
      .from(table)
      .update({ stock: newStock })
      .eq('id', itemId);

    if (updateErr) throw updateErr;

    // Log movement
    const { data: logData, error: logErr } = await supabase
      .from('inventory_movements')
      .insert({
        item_type: itemType === 'produk' ? 'finished_good' : 'raw_material',
        item_id: itemId,
        item_name: itemName,
        movement_type: 'adjustment',
        quantity_change: quantityChange,
        previous_stock: prevStock,
        current_stock: newStock,
        reason: reason,
        created_by: userId,
      })
      .select()
      .single();

    if (logErr) throw logErr;
    return logData;
  },
};
