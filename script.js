/* Ссылки на ваши чаты. Замените VK и Max на свои. */
var CHATS = {
  "Telegram": { url: "https://t.me/RepetitorOfRussian", prefill: true },
  "VK":       { url: "https://vk.me/ВАШ_ЛОГИН_VK",      prefill: false },
  "Max":      { url: "https://max.ru/ВАША_ССЫЛКА_MAX",  prefill: false }
};
var NAMES = { "Telegram": "Telegram", "VK": "ВКонтакте", "Max": "Max" };

var d = document.getElementById("dlg"), f = document.getElementById("f"), ok = document.getElementById("ok");
var go = document.getElementById("go"), hint = document.getElementById("hint"), txt = document.getElementById("txt");

document.querySelectorAll("[data-open]").forEach(function (b) {
  b.onclick = function () { f.hidden = false; ok.hidden = true; d.showModal(); };
});
document.getElementById("close").onclick = function () { d.close(); };
d.addEventListener("click", function (e) { if (e.target === d) d.close(); });

f.onsubmit = function (e) {
  e.preventDefault();
  var v = new FormData(f), mes = v.get("mes"), chat = CHATS[mes];
  var t = "Заявка на пробное занятие\nЗаполняет: " + v.get("who") +
    "\nУченик: " + v.get("name") + ", " + v.get("cls") + " класс" +
    "\nЗапрос: " + (v.get("req") || "не указан") +
    "\nТелефон: " + v.get("tel") + "\nМессенджер: " + mes;
  txt.value = t;
  go.textContent = "Отправить в " + NAMES[mes];
  go.href = chat.prefill ? chat.url + "?text=" + encodeURIComponent(t) : chat.url;
  hint.textContent = chat.prefill ? "" :
    "Текст заявки скопируется сам. В чате вставьте его и отправьте.";
  go.onclick = function () {
    if (!chat.prefill) {
      try { navigator.clipboard.writeText(t); } catch (err) { txt.select(); document.execCommand("copy"); }
    }
  };
  f.hidden = true; ok.hidden = false;
};
