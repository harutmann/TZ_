import json from './invoices.js';

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
	let comedyCount = 0;
  let result = `Счет для ${invoice.customer}\n`;

  const format = (number) => new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2
  }).format(number);

  for (let perf of invoice.performance) {
		let play = perf.playId
    switch (perf.type) {
      case "tragedy":
        let thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
					result += `${play}: ${format(thisAmount)}`;
					result += `(${perf.audience} мест)\n`;
					totalAmount += thisAmount;
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
				result += `${play}: ${format(thisAmount)}`;
				result += `(${perf.audience} мест)\n`;
				totalAmount += thisAmount;
        break;
      default:
        throw new Error('неизвестный тип: ${perf.type}');
    }
    // Добавление бонусов
		volumeCredits += Math.max(perf.audience - 30, 0);
    // Дополнительный бонус за каждые 10 комедий
		if ("comedy" === perf.type) comedyCount++;
		if(comedyCount!==0 && comedyCount%10 === 0 ) volumeCredits += Math.floor(perf.audience / 5);

  }
	// Вывод строки счета
	result += `Итого с вас ${(format(totalAmount))}\n`;
	result += `Вы заработали ${volumeCredits} бонусов\n`;

  return result;
}

console.log(statement(json))
