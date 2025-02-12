// express sunucusunun çalışma mantığını içerecek.
//setupServer adında bir fonksiyon oluşturun; bu fonksiyon express sunucusunu oluşturacak.
//  Bu fonksiyon şunları içermelidir:
//express() çağrısıyla sunucunun oluşturulması
//cors ve pino logger'ının ayarlanması
//Mevcut olmayan rotalar için 404 hata durumu ve uygun mesaj döndürülmesi.{message: 'Not found'}
// Sunucunun, PORT ortam değişkeni aracılığıyla belirtilen veya belirtilmemişse 3000 numaralı portta başlatılması
//Sunucu başarıyla başlatıldığında konsola “Server is running on port {PORT}” mesajının yazdırılması; burada {PORT} sizin port numaranızdır

import express from 'express';
import cors from 'cors';
import pino from 'pino';
import {getAllContacts, getContactById} from './services/contacts.js';
const setupServer = ()=>{
    const server = express();

    const logger = pino({
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true, // Renkli çıktı
            translateTime: true, // Tarih ve saat bilgisi ekleme
          },
        },
      });


    server.use(express.json());
    server.use(cors());

    const PORT= Number(process.env.PORT || 3000 );


    //getAllContacts getContactById


    server.get('/contacts', async(req,res)=>{
    
    try{
        const contacts = await getAllContacts();

        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
                // İstek işlenmesi sonucunda elde edilen iletişimler dizisi
        });
    }catch(error){
        res.status(500).json({
            status: 500,
            message: "server error !",
            data: error.message,
        });
    }

});


server.get('/contacts/:contactId', async(req,res)=>{
    
    try{
        const {contactId} = req.params;
        const contact = await getContactById(contactId);
    
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId} !`,
            data:contact
        });
    
        if(!contact){
            res.status(404).json({
                status: 404,
                message: 'Contact not found',
                data: contact,
                //Verilen kimlik numarasıyla iletişimin bulunup bulunmadığını kontrol edin. Eğer iletişim bulunamazsa, 404 durum kodu ile aşağıdaki nesneyi döndürün
                    // İstek işlenmesi sonucunda elde edilen iletişim
            });
            return;
        }
    }catch(error){
        res.status(500).json({
            status:500,
            data: error.message,
            message:"server error",
        })
    }


});

server.get('*',(req,res)=>{
    
    res.status(404).json({
        status: 404,
        message: "Not available route",
    });
});

server.listen(PORT,()=>{
    logger.info(`Server is running on port ${PORT}`);
});
}

export default setupServer;