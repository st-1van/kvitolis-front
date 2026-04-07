import QRCode from 'qrcode';

const baseURL = 'https://kvitolis.com.ua/garden';


// Функція для генерації QR коду для кожної особи
export async function generateQRCodeForPerson(person: { name: string; alleySlug: string }) {
  const { name, alleySlug } = person;
  const url = `${baseURL}/${alleySlug}?name=${encodeURIComponent(name)}`;
  
  try {
    // Генеруємо QR код в форматі SVG
    const qrCodeSVG = await QRCode.toString(url, {  
      type: 'svg',
      width: 200,
    });

    console.log(`✓ Створено QR код для ${name} (${alleySlug})`);    
    return qrCodeSVG;   
    
  } catch (error) {
    console.error(`✗ Помилка при генерації QR коду для ${name}:`, error);
  }
}


