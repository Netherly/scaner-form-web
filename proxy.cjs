const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.text({ type: "text/plain", limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.post("/form1", async (req, res) => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyTKZ4z840J6leWUKr6SukYQsuooRh4kINSsi7pwY2MCQ-yfpF0Ckqkg7Uwo3tfj2uf/exec", {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "text/plain" }, 
    });

    const text = await response.text();
    console.log("Ответ от скрипта:\n", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      return res.status(500).json({ success: false, message: "Ответ от скрипта не JSON", raw: text });
    }

    res.json(data);
  } catch (error) {
    console.error("Ошибка при обращении к скрипту:", error);
    res.status(500).json({ success: false, message: "Ошибка на сервере" });
  }
});
app.post("/form2", async (req, res) => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyTKZ4z840J6leWUKr6SukYQsuooRh4kINSsi7pwY2MCQ-yfpF0Ckqkg7Uwo3tfj2uf/exec",
      {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "text/plain" }, 
      }
    );

    const text = await response.text();
    console.log("Ответ от скрипта (form2):\n", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({ success: false, message: "Ответ от скрипта не JSON", raw: text });
    }

    res.json(data);
  } catch (error) {
    console.error("Ошибка при обращении к скрипту (form2):", error);
    res.status(500).json({ success: false, message: "Ошибка на сервере" });
  }
});
app.post("/form3", async (req, res) => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwza8zfDyK65DJE_7abVHBVb0F_wO7APWK2C6xWB5nOouFKH3rjTvwYWv0M1QJqZ5lB/exec",
      {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "text/plain" }, 
      }
    );

    const text = await response.text();
    console.log("Ответ от скрипта (form3):\n", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({ success: false, message: "Ответ от скрипта не JSON", raw: text });
    }

    res.json(data);
  } catch (error) {
    console.error("Ошибка при обращении к скрипту (form2):", error);
    res.status(500).json({ success: false, message: "Ошибка на сервере" });
  }
});
app.post("/form4", async (req, res) => {
  console.log("Получен запрос на /form4 с телом:", req.body);
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwza8zfDyK65DJE_7abVHBVb0F_wO7APWK2C6xWB5nOouFKH3rjTvwYWv0M1QJqZ5lB/exec",
      {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "text/plain" }, 
      }
    );

    const text = await response.text();
    console.log("Ответ от скрипта (form4):\n", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({ success: false, message: "Ответ от скрипта не JSON", raw: text });
    }

    res.json(data);
  } catch (error) {
    console.error("Ошибка при обращении к скрипту (form2):", error);
    res.status(500).json({ success: false, message: "Ошибка на сервере" });
  }
});

app.listen(3001, () => console.log("Proxy server running on http://localhost:3001"));