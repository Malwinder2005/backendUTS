// order.service.js
class OrderService {
    constructor(productRepo, orderRepo) {
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
    }

    async checkout(userId, cartItems) {
        console.log(`[OrderService] Memulai proses checkout untuk User: ${userId}`);

        try {
            // Kita kumpulkan semua data produk dulu di awal
            const orderDetails = await this._validateAndCalculate(cartItems);

            // Simpan ke database
            const newOrder = await this.orderRepo.save({
                userId,
                ...orderDetails,
                status: 'WAITING_PAYMENT',
                createdAt: new Date()
            });

            // Update stok setelah order aman
            await this._updateInventory(orderDetails.items);

            console.log(`[OrderService] Order #${newOrder.id} berhasil dibuat.`);
            return newOrder;

        } catch (error) {
            console.error(`[OrderService] Gagal checkout: ${error.message}`);
            throw error; // Lempar balik ke controller
        }
    }

    // Fungsi pembantu (private-like) supaya kode utama tetap bersih
    async _validateAndCalculate(items) {
        let total = 0;
        const processedItems = [];

        for (const item of items) {
            const product = await this.productRepo.findById(item.productId);

            if (!product || product.stock < item.quantity) {
                throw new Error(`Waduh, stok ${product?.name || 'produk'} nggak cukup nih.`);
            }

            total += product.price * item.quantity;
            processedItems.push({ 
                id: product.id, 
                qty: item.quantity, 
                subtotal: product.price * item.quantity 
            });
        }

        return { items: processedItems, totalAmount: total };
    }

    async _updateInventory(items) {
        return Promise.all(items.map(item => 
            this.productRepo.reduceStock(item.id, item.qty)
        ));
    }
}