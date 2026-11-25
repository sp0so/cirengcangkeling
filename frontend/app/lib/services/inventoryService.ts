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

  async getCategories() {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error || !data) return null;
    return data.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description || '',
    }));
  },

  async addCategory(name: string, description?: string) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const { data, error } = await supabase
      .from('product_categories')
      .insert({ name, slug, description, is_active: true })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async addProduct(product: Omit<Product, 'id'>) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        code: product.sku,
        category_id: product.categoryId.includes('-') && product.categoryId.length === 36 ? product.categoryId : null,
        selling_price: product.price,
        estimated_hpp: product.baseCost,
        stock: product.stock,
        min_stock: product.minStock,
        unit: product.unit,
        is_active: product.isActive !== false,
      })
      .select()
      .single();

    if (error) console.warn('Supabase product insert error:', error);
    return data;
  },

  async updateProduct(id: string, updates: Partial<Product>) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const payload: Record<string, unknown> = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.sku !== undefined) payload.code = updates.sku;
    if (updates.price !== undefined) payload.selling_price = updates.price;
    if (updates.baseCost !== undefined) payload.estimated_hpp = updates.baseCost;
    if (updates.stock !== undefined) payload.stock = updates.stock;
    if (updates.minStock !== undefined) payload.min_stock = updates.minStock;
    if (updates.unit !== undefined) payload.unit = updates.unit;
    if (updates.isActive !== undefined) payload.is_active = updates.isActive;

    const { data, error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) console.warn('Supabase product update error:', error);
    return data;
  },

  async deleteProduct(id: string) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', id);

    if (error) console.warn('Supabase product delete error:', error);
    return !error;
  },

  async addRawMaterial(material: Omit<RawMaterial, 'id'>) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('raw_materials')
      .insert({
        name: material.name,
        code: material.code,
        unit: material.unit,
        stock: material.stock,
        min_stock: material.minStock,
        cost_per_unit: material.unitCost,
        is_active: true,
      })
      .select()
      .single();

    if (error) console.warn('Supabase raw material insert error:', error);
    return data;
  },

  async updateRawMaterial(id: string, updates: Partial<RawMaterial>) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const payload: Record<string, unknown> = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.code !== undefined) payload.code = updates.code;
    if (updates.unit !== undefined) payload.unit = updates.unit;
    if (updates.stock !== undefined) payload.stock = updates.stock;
    if (updates.minStock !== undefined) payload.min_stock = updates.minStock;
    if (updates.unitCost !== undefined) payload.cost_per_unit = updates.unitCost;

    const { data, error } = await supabase
      .from('raw_materials')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) console.warn('Supabase raw material update error:', error);
    return data;
  },

  async deleteRawMaterial(id: string) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { error } = await supabase
      .from('raw_materials')
      .update({ is_active: false })
      .eq('id', id);

    if (error) console.warn('Supabase raw material delete error:', error);
    return !error;
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
