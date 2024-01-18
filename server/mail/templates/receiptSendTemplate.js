
const receiptSend = (name) => {
  return (
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Purchase</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Dear ${name},</h2>
        <p>Thank you for your recent purchase. We appreciate your business.</p>
        <p>Your receipt is attached below to this email.</p>
        <p style="font-size: 18px; font-weight: bold; color: #4CAF50; text-align: center;">
            <i>DishDelight</i>
        </p>
    </div>
</body>
</html>`
  )
}

export default receiptSend
