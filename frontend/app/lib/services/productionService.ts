import { getClientSafe } from './supabaseService';

export const productionService = {
  async getRecipes() {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('recipes')
      .select('*, products(name, code), recipe_details(*, raw_materials(name, cost_per_unit, unit))');

    if (error) return null;
    return data;
  },

  async executeBatch(
    productId: string,
    plannedQty: number,
    actualQty: number,
    adjustments?: { raw_material_id: string; actual_quantity: number }[],
    notes?: string,
    userId?: string
  ) {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase.rpc('execute_production_batch', {
      p_product_id: productId,
      p_planned_quantity: plannedQty,
      p_actual_quantity: actualQty,
      p_raw_material_adjustments: adjustments ? JSON.stringify(adjustments) : null,
      p_notes: notes || null,
      p_user_id: userId || null,
    });

    if (error) throw error;
    return data;
  },

  async getProductionHistory() {
    const supabase = getClientSafe();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('productions')
      .select('*, products(name, unit), production_details(*, raw_materials(name))')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) return null;
    return data;
  },
};
