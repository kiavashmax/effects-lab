// ---- theme toggle ----
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const themeIcon = themeBtn.querySelector(".theme-icon");
const themeLabel = themeBtn.querySelector(".theme-label");
const metaTheme = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme){
    root.setAttribute("data-theme",theme);
    const isLight = theme === "light";
    themeIcon.innerHTML = isLight ? "&#9728;" : "&#9790;";
    themeLabel.textContent = isLight ? "Light" : "Dark";
    metaTheme.setAttribute("content",isLight ? "#f4f4f5" : "#0a0a0a");
    try{ localStorage.setItem("el-theme",theme) }catch(e){}
}

let savedTheme = "dark";
try{ savedTheme = localStorage.getItem("el-theme") || "dark" }catch(e){}
applyTheme(savedTheme === "light" ? "light" : "dark");

themeBtn.addEventListener("click",() => {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// ---- reveal cards ----
const cards = document.querySelectorAll(".card");
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target) }
    });
}, {threshold:0.12});

cards.forEach((c,i) => {
    c.style.animationDelay = (i * 35) + "ms";
    io.observe(c);
});

// ---- spotlight ----
document.querySelectorAll(".effect-spotlight").forEach(el => {
    el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
        el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
});

// ---- magnetic ----
document.querySelectorAll(".effect-magnetic").forEach(el => {
    el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.35;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = "translate(" + x + "px, " + y + "px)";
    });
    el.addEventListener("pointerleave", () => {
        el.style.transform = "";
    });
});

// ---- follower ----
document.querySelectorAll(".effect-follower").forEach(el => {
    const dot = el.querySelector(".follower");
    const r = el.getBoundingClientRect();
    let x = r.width / 2, y = r.height / 2, tx = x, ty = y;
    el.addEventListener("pointermove", e => {
        const b = el.getBoundingClientRect();
        tx = e.clientX - b.left;
        ty = e.clientY - b.top;
    });
    (function tick(){
        x += (tx - x) * 0.2;
        y += (ty - y) * 0.2;
        dot.style.left = x + "px";
        dot.style.top = y + "px";
        requestAnimationFrame(tick);
    })();
});

// ---- ripple ----
document.querySelectorAll(".effect-ripple").forEach(el => {
    el.addEventListener("pointerdown", e => {
        const r = el.getBoundingClientRect();
        const size = Math.max(r.width, r.height) * 2;
        const span = document.createElement("span");
        span.className = "ripple";
        span.style.width = span.style.height = size + "px";
        span.style.left = (e.clientX - r.left) + "px";
        span.style.top = (e.clientY - r.top) + "px";
        el.appendChild(span);
        setTimeout(() => span.remove(), 700);
    });
});

// ---- copy ----
const ROOT_VARS = [
    "--bg:#0a0a0a",
    "--surface:#111",
    "--surface-2:#1a1a1a",
    "--border:#1e1e1e",
    "--border-strong:#333",
    "--hover:#333",
    "--fg:#e8e8e8",
    "--muted:#666",
    "--gold:#f7d354",
    "--gold-dim:rgba(247,211,84,.45)",
    "--gold-faint:rgba(247,211,84,.15)"
].join(";");

function escapeRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&") }

function selMatches(sel,key){
    const k = escapeRe(key);
    const re = new RegExp(
        "(?:^|\\.)" + k + "(?![a-zA-Z0-9_-])" +
        "|(?:^|\\.)effect-" + k + "(?![a-zA-Z0-9_-])"
    );
    return re.test(sel);
}

function extractCSS(key){
    const found = [];
    for(const sheet of document.styleSheets){
        let rules;
        try{ rules = sheet.cssRules }catch(e){ continue }
        if(!rules) continue;
        for(const rule of rules){
            if(rule.selectorText && selMatches(rule.selectorText,key)){
                found.push(rule.cssText);
            } else if(rule.type === 7 && rule.name && rule.name.includes(key)){
                found.push(rule.cssText);
            }
        }
    }
    if(!found.length) return "";
    return "/* theme variables (add once to your :root) */\n:root{" + ROOT_VARS + "}\n\n" + found.join("\n\n");
}

function extractJS(key){
    const el = document.querySelector('script[type="text/plain"][data-key="' + key + '"]');
    return el ? el.textContent.trim() : "";
}

document.querySelectorAll(".copy-btn").forEach(btn => {
    const key = btn.dataset.key;
    const hasJS = !!extractJS(key);
    if(hasJS) btn.textContent = "Copy CSS + JS";

    btn.addEventListener("click", async () => {
        const css = extractCSS(key);
        const js = extractJS(key);
        if(!css) return;

        const out = js
            ? "/* ---------- CSS ---------- */\n" + css + "\n\n/* ---------- JS ---------- */\n" + js + "\n"
            : css;

        try{
            await navigator.clipboard.writeText(out);
        }catch(e){
            const ta = document.createElement("textarea");
            ta.value = out;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }

        btn.classList.add("copied");
        const prev = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => {
            btn.classList.remove("copied");
            btn.textContent = prev;
        }, 1400);
    });
});