// zero_profits.js
// Node script: fetch all /ombor records and set profit_dollar and profit_sum to 0 for each.
// Usage: node zero_profits.js (Node 18+ recommended for fetch)

const BASE = process.env.API_BASE || 'http://localhost:5003';

async function main() {
  try {
    const res = await fetch(`${BASE}/ombor`);
    if (!res.ok) {
      console.error("Xatolik: /ombor dan ma'lumot olinmadi", res.status);
      process.exit(1);
    }
    const items = await res.json();
    if (!items || items.length === 0) {
      console.log('Hech qanday ombor yozuvi topilmadi.');
      return;
    }

    for (const it of items) {
      const id = it._id;
      if (!id) {
        console.log("Yozuvda _id yo'q, o'tkazib yuborilmoqda.");
        continue;
      }

      const body = {
        navi: it.navi,
        ombordagi_mahsulot: it.ombordagi_mahsulot,
        kg_narxi: it.kg_narxi,
        profit_dollar: 0,
        profit_sum: 0
      };

      try {
        const putRes = await fetch(`${BASE}/ombor/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (!putRes.ok) {
          const txt = await putRes.text();
          console.log(`Yozuv ${id} yangilanmadi: status=${putRes.status} body=${txt}`);
        } else {
          console.log(`Yozuv ${id} yangilandi: profit 0 qilindi.`);
        }
      } catch (err) {
        console.log(`Yozuv ${id} yangilanmadi: ${err.message}`);
      }
    }

    console.log('Barcha yozuvlar qayta ishlandi.');
  } catch (err) {
    console.error('Xatolik:', err.message);
    process.exit(1);
  }
}

main();
