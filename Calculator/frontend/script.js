async function get_number() {
    const response = await fetch("http://localhost:5000/api/get");
    const data = await response.json();

    document.getElementById("result").textContent = "Result: " + data.number;
}



async function add(){
    const number1 = document.getElementById("number1").value;
    const number2 = document.getElementById("number2").value;

    try {
        await fetch(`http://localhost:5000/api/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number1, number2 })
        });
        get_number();

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error occurred while processing request.';

    }
}

