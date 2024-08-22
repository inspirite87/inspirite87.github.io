document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'converter-container';
    const form = document.createElement('form');
    form.id = 'converter-form';
    const amountLabel = document.createElement('label');
    amountLabel.setAttribute('for', 'amount');
    amountLabel.textContent = 'Amount:';
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.id = 'amount';
    amountInput.name = 'amount';
    amountInput.min = '0';
    amountInput.step = '0.01';
    amountInput.required = true;

   
    const currencies = [
        { code: 'rub', name: 'Russian Ruble' },
        { code: 'usd', name: 'United States Dollar' },
        { code: 'eur', name: 'Euro' },
        { code: 'gbp', name: 'British Pound Sterling' },
        { code: 'jpy', name: 'Japanese Yen' },
        { code: 'cny', name: 'Chinese Yuan' },
        { code: 'krw', name: 'South Korean Won' },
        { code: 'kgs', name: 'Kyrgyzstani Som' },
        { code: 'kzt', name: 'Kazakhstani Tenge' },
        { code: 'uah', name: 'Ukrainian Hryvnia' }
    ];

    const fromCurrencyLabel = document.createElement('label');
    fromCurrencyLabel.setAttribute('for', 'from-currency');
    fromCurrencyLabel.textContent = 'From Currency:';
    const fromCurrencySelect = document.createElement('select');
    fromCurrencySelect.id = 'from-currency';
    fromCurrencySelect.name = 'from-currency';

    const chooseOptionFrom = document.createElement('option');
    chooseOptionFrom.value = '';
    chooseOptionFrom.textContent = 'Select currency';
    chooseOptionFrom.selected = true;
    chooseOptionFrom.disabled = true;
    fromCurrencySelect.appendChild(chooseOptionFrom);

    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency.code;
        option.textContent = `${currency.name} (${currency.code.toUpperCase()})`;
        fromCurrencySelect.appendChild(option);
    });

    const toCurrencyLabel = document.createElement('label');
    toCurrencyLabel.setAttribute('for', 'to-currency');
    toCurrencyLabel.textContent = 'To Currency:';
    const toCurrencySelect = document.createElement('select');
    toCurrencySelect.id = 'to-currency';
    toCurrencySelect.name = 'to-currency';

    const chooseOptionTo = document.createElement('option');
    chooseOptionTo.value = '';
    chooseOptionTo.textContent = 'Select currency';
    chooseOptionTo.selected = true;
    chooseOptionTo.disabled = true;
    toCurrencySelect.appendChild(chooseOptionTo);

    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency.code;
        option.textContent = `${currency.name} (${currency.code.toUpperCase()})`;
        toCurrencySelect.appendChild(option);
    });

    const calculateBtn = document.createElement('button');
    calculateBtn.type = 'submit';
    calculateBtn.id = 'calculate-btn';
    calculateBtn.textContent = 'Calculate';

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.id = 'clear-btn';
    clearBtn.textContent = 'Clear';

    const swapBtn = document.createElement('button');
    swapBtn.type = 'button';
    swapBtn.id = 'swap-btn';
    swapBtn.textContent = 'Swap Currencies';

    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    resultDiv.id = 'result';

    form.appendChild(amountLabel);
    form.appendChild(amountInput);
    form.appendChild(fromCurrencyLabel);
    form.appendChild(fromCurrencySelect);
    form.appendChild(toCurrencyLabel);
    form.appendChild(toCurrencySelect);
    form.appendChild(swapBtn);
    form.appendChild(calculateBtn);
    form.appendChild(clearBtn);

    container.appendChild(form);
    container.appendChild(resultDiv);
    document.body.appendChild(container);

    async function fetchExchangeRates() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            return data.rates;
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            return null;
        }
    }

    async function calculateConversion(e) {
        e.preventDefault();

        const amount = parseFloat(document.getElementById('amount').value);
        const fromCurrency = document.getElementById('from-currency').value.toUpperCase();
        const toCurrency = document.getElementById('to-currency').value.toUpperCase();

        if (!amount || !fromCurrency || !toCurrency || fromCurrency === toCurrency) {
            document.getElementById('result').textContent = 'Invalid input.';
            return;
        }

        const rates = await fetchExchangeRates();
        if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
            document.getElementById('result').textContent = 'Error fetching rates.';
            return;
        }

        const convertedAmount = amount * (rates[toCurrency] / rates[fromCurrency]);
        document.getElementById('result').textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
    }

    function clearForm() {
        document.getElementById('converter-form').reset();
        document.getElementById('result').textContent = '';
    }

    function swapCurrencies() {
        const fromCurrencySelect = document.getElementById('from-currency');
        const toCurrencySelect = document.getElementById('to-currency');

        const tempCurrency = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = tempCurrency;
    }

    document.getElementById('converter-form').addEventListener('submit', calculateConversion);
    document.getElementById('clear-btn').addEventListener('click', clearForm);
    document.getElementById('swap-btn').addEventListener('click', swapCurrencies);
});