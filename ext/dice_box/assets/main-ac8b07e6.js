var Bn = Object.defineProperty;
var $n = (i,e,n)=>e in i ? Bn(i, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : i[e] = n;
var Ze = (i,e,n)=>($n(i, typeof e != "symbol" ? e + "" : e, n),
n);
import {h as In} from "./dice-box.es-8de80f95.js";
const Hn = "/assets/cancel-75f2fea5.svg"
  , Vn = "/assets/checkmark-8c804118.svg"
  , Un = "/assets/minus-f88bf51d.svg";
class Gn {
    constructor(e) {
        this.target = document.querySelector(e) || document.body,
        this.timeout = 500,
        this.elem = document.createElement("div"),
        this.elem.className = "displayResults",
        this.resultsElem1 = document.createElement("div"),
        this.resultsElem1.className = "results hidden",
        this.resultsElem1.style.transition = `all ${this.timeout}ms`,
        this.resultsElem2 = document.createElement("div"),
        this.resultsElem2.className = "results hidden",
        this.resultsElem2.style.transition = `all ${this.timeout}ms`,
        this.init()
    }
    async init() {
        this.elem.append(this.resultsElem1),
        this.elem.append(this.resultsElem2),
        this.target.prepend(this.elem),
        this.resultsElem1.addEventListener("click", ()=>this.clear()),
        this.resultsElem2.addEventListener("click", ()=>this.clear()),
        this.elem.addEventListener("click", ()=>{
          // Custom
          const rollers = document.getElementById('rollers');
          rollers.classList.remove("hideEffect", "hidden");
        }),
        this.even = !1
    }
    showResults(e) {
        this.clear(this[`resultsElem${this.even ? 1 : 2}`]);
        let n;
        e.rolls && !Array.isArray(e.rolls) ? n = Object.values(e.rolls).map(r=>r) : n = Object.values(this.recursiveSearch(e, "rolls")).map(r=>Object.values(r)).flat();
        let o = 0;
        if (e.hasOwnProperty("value"))
            o = e.value;
        else {
            o = n.reduce((c,l)=>c + l.value, 0);
            let r = e.reduce((c,l)=>c + l.modifier, 0);
            o += r
        }
        o = isNaN(o) ? "..." : o;
        let a = "";
        n.forEach((r,c)=>{
            let l, t = r.die || r.sides || "fate";
            c !== 0 && (a += ", "),
            r.success !== void 0 && r.success !== null ? l = r.success ? `<svg class="success"><use href="${Vn}#checkmark"></use></svg>` : r.failures > 0 ? `<svg class="failure"><use href="${Hn}#cancel"></use></svg>` : `<svg class="null"><use href="${Un}#minus"></use></svg>` : l = r.hasOwnProperty("value") ? r.value.toString() : "...";
            let p = `d${t}`;
            (r.critical === "success" || r.hasOwnProperty("value") && t == r.value) && (p += " crit-success"),
            (r.critical === "failure" || r.success === null && r.hasOwnProperty("value") && r.value <= 1 && t !== "fate") && (p += " crit-failure"),
            r.drop && (p += " die-dropped"),
            r.reroll && (p += " die-rerolled"),
            r.explode && (p += " die-exploded"),
            t === "fate" && (r.value === 1 && (p += " crit-success"),
            r.value === -1 && (p += " crit-failure")),
            p !== "" && (l = `<span class='${p.trim()}'>${l}</span>`),
            a += l
        }
        ),
        a += ` = <strong>${o}</strong>`;
        const u = this[`resultsElem${this.even ? 2 : 1}`];
        u.innerHTML = a,
        clearTimeout(u.hideTimer),
        u.classList.add("showEffect"),
        u.classList.remove("hidden"),
        u.classList.remove("hideEffect"),
        this.even = !this.even
    }
    clear(e) {
        const n = e || this[`resultsElem${this.even ? 1 : 2}`];
        n.classList.replace("showEffect", "hideEffect"),
        this.even = !this.even,
        n.hideTimer = setTimeout(()=>{
          n.classList.replace("hideEffect", "hidden");
        }, this.timeout)
    }
    recursiveSearch(e, n, o=[], a) {
        const u = o;
        return Object.keys(e).forEach(r=>{
            const c = e[r];
            r === n ? (u.push(c),
            a && typeof a == "function" && a(e)) : c && typeof c == "object" && this.recursiveSearch(c, n, u, a)
        }
        ),
        u
    }
}
var zn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , rn = {
    exports: {}
};
(function(i, e) {
    (function(n, o) {
        i.exports = o()
    }
    )(zn, ()=>(()=>{
        var n = {
            95: (a,u,r)=>{
                Object.defineProperty(u, "__esModule", {
                    value: !0
                }),
                u.DiceRoller = void 0;
                const c = r(51);
                u.DiceRoller = class {
                    constructor(l, t=1e3) {
                        this.randFunction = Math.random,
                        this.maxRollCount = 1e3,
                        l && (this.randFunction = l),
                        this.maxRollCount = t
                    }
                    parse(l) {
                        return c.parse(l)
                    }
                    roll(l) {
                        const t = c.parse(l);
                        return this.rollType(t)
                    }
                    rollValue(l) {
                        return this.roll(l).value
                    }
                    rollParsed(l) {
                        return this.rollType(l)
                    }
                    rollType(l) {
                        let t;
                        switch (l.type) {
                        case "diceExpression":
                            t = this.rollDiceExpr(l);
                            break;
                        case "group":
                            t = this.rollGroup(l);
                            break;
                        case "die":
                            t = this.rollDie(l);
                            break;
                        case "expression":
                            t = this.rollExpression(l);
                            break;
                        case "mathfunction":
                            t = this.rollFunction(l);
                            break;
                        case "inline":
                            t = this.rollType(l.expr);
                            break;
                        case "number":
                            t = Object.assign(Object.assign({}, l), {
                                success: null,
                                successes: 0,
                                failures: 0,
                                valid: !0,
                                order: 0
                            });
                            break;
                        default:
                            throw new Error(`Unable to render ${l.type}`)
                        }
                        return l.label && (t.label = l.label),
                        t
                    }
                    rollDiceExpr(l) {
                        const t = this.rollType(l.head)
                          , p = [t]
                          , m = []
                          , h = l.ops.reduce((y,S,x)=>{
                            const E = this.rollType(S.tail);
                            switch (E.order = x,
                            p.push(E),
                            m.push(S.op),
                            S.op) {
                            case "+":
                                return y + E.value;
                            case "-":
                                return y - E.value;
                            default:
                                return y
                            }
                        }
                        , t.value);
                        return {
                            dice: p,
                            ops: m,
                            success: null,
                            successes: 0,
                            failures: 0,
                            type: "diceexpressionroll",
                            valid: !0,
                            value: h,
                            order: 0
                        }
                    }
                    rollGroup(l) {
                        let t = l.rolls.map((S,x)=>Object.assign(Object.assign({}, this.rollType(S)), {
                            order: x
                        }))
                          , p = 0
                          , m = 0
                          , h = !1;
                        if (l.mods) {
                            const S = l.mods
                              , x = E=>(h = S.some(R=>["failure", "success"].includes(R.type)),
                            E = S.reduce((R,L)=>this.applyGroupMod(R, L), E),
                            h && (E = E.map(R=>(p += R.successes,
                            m += R.failures,
                            R.value = R.successes - R.failures,
                            R.success = R.value > 0,
                            R))),
                            E);
                            if (t.length === 1 && ["die", "diceexpressionroll"].includes(t[0].type)) {
                                const E = t[0];
                                let R = E.type === "die" ? E.rolls : E.dice.filter(L=>L.type !== "number").reduce((L,V)=>[...L, ...V.type === "die" ? V.rolls : V.dice], []);
                                R = x(R),
                                E.value = R.reduce((L,V)=>V.valid ? L + V.value : L, 0)
                            } else
                                t = x(t)
                        }
                        const y = t.reduce((S,x)=>x.valid ? S + x.value : S, 0);
                        return {
                            dice: t,
                            success: h ? y > 0 : null,
                            successes: p,
                            failures: m,
                            type: "grouproll",
                            valid: !0,
                            value: y,
                            order: 0
                        }
                    }
                    rollDie(l) {
                        const t = this.rollType(l.count);
                        if (t.value > this.maxRollCount)
                            throw new Error("Entered number of dice too large.");
                        let p, m;
                        l.die.type === "fate" ? (m = {
                            type: "fate",
                            success: null,
                            successes: 0,
                            failures: 0,
                            valid: !1,
                            value: 0,
                            order: 0
                        },
                        p = Array.from({
                            length: t.value
                        }, (R,L)=>this.generateFateRoll(L))) : (m = this.rollType(l.die),
                        p = Array.from({
                            length: t.value
                        }, (R,L)=>this.generateDiceRoll(m.value, L))),
                        l.mods && (p = l.mods.reduce((R,L)=>this.applyMod(R, L), p));
                        let h = 0
                          , y = 0;
                        l.targets && (p = l.targets.reduce((R,L)=>this.applyMod(R, L), p).map(R=>(h += R.successes,
                        y += R.failures,
                        R.value = R.successes - R.failures,
                        R.success = R.value > 0,
                        R)));
                        let S = !1
                          , x = 0;
                        if (l.match) {
                            const R = l.match
                              , L = p.reduce((U,Y)=>U.set(Y.roll, (U.get(Y.roll) || 0) + 1), new Map)
                              , V = new Set(Array.from(L.entries()).filter(([U,Y])=>Y >= R.min.value).filter(([U])=>!(R.mod && R.expr) || this.successTest(R.mod, this.rollType(R.expr).value, U)).map(([U])=>U));
                            p.filter(U=>V.has(U.roll)).forEach(U=>U.matched = !0),
                            R.count && (S = !0,
                            x = V.size)
                        }
                        l.sort && (p = this.applySort(p, l.sort));
                        const E = p.reduce((R,L)=>L.valid ? R + L.value : R, 0);
                        return {
                            count: t,
                            die: m,
                            rolls: p,
                            success: l.targets ? E > 0 : null,
                            successes: h,
                            failures: y,
                            type: "die",
                            valid: !0,
                            value: S ? x : E,
                            order: 0,
                            matched: S
                        }
                    }
                    rollExpression(l) {
                        const t = this.rollType(l.head)
                          , p = [t]
                          , m = []
                          , h = l.ops.reduce((y,S)=>{
                            const x = this.rollType(S.tail);
                            switch (p.push(x),
                            m.push(S.op),
                            S.op) {
                            case "+":
                                return y + x.value;
                            case "-":
                                return y - x.value;
                            case "*":
                                return y * x.value;
                            case "/":
                                return y / x.value;
                            case "%":
                                return y % x.value;
                            case "**":
                                return y ** x.value;
                            default:
                                return y
                            }
                        }
                        , t.value);
                        return {
                            dice: p,
                            ops: m,
                            success: null,
                            successes: 0,
                            failures: 0,
                            type: "expressionroll",
                            valid: !0,
                            value: h,
                            order: 0
                        }
                    }
                    rollFunction(l) {
                        const t = this.rollType(l.expr);
                        let p;
                        switch (l.op) {
                        case "floor":
                            p = Math.floor(t.value);
                            break;
                        case "ceil":
                            p = Math.ceil(t.value);
                            break;
                        case "round":
                            p = Math.round(t.value);
                            break;
                        case "abs":
                            p = Math.abs(t.value);
                            break;
                        default:
                            p = t.value
                        }
                        return {
                            expr: t,
                            op: l.op,
                            success: null,
                            successes: 0,
                            failures: 0,
                            type: "mathfunction",
                            valid: !0,
                            value: p,
                            order: 0
                        }
                    }
                    applyGroupMod(l, t) {
                        return this.getGroupModMethod(t)(l)
                    }
                    getGroupModMethod(l) {
                        const t = p=>p.value;
                        switch (l.type) {
                        case "success":
                            return this.getSuccessMethod(l, t);
                        case "failure":
                            return this.getFailureMethod(l, t);
                        case "keep":
                            return this.getKeepMethod(l, t);
                        case "drop":
                            return this.getDropMethod(l, t);
                        default:
                            throw new Error(`Mod ${l.type} is not recognised`)
                        }
                    }
                    applyMod(l, t) {
                        return this.getModMethod(t)(l)
                    }
                    getModMethod(l) {
                        const t = p=>p.roll;
                        switch (l.type) {
                        case "success":
                            return this.getSuccessMethod(l, t);
                        case "failure":
                            return this.getFailureMethod(l, t);
                        case "crit":
                            return this.getCritSuccessMethod(l, t);
                        case "critfail":
                            return this.getCritFailureMethod(l, t);
                        case "keep":
                            return p=>this.getKeepMethod(l, t)(p).sort((m,h)=>m.order - h.order);
                        case "drop":
                            return p=>this.getDropMethod(l, t)(p).sort((m,h)=>m.order - h.order);
                        case "explode":
                            return this.getExplodeMethod(l);
                        case "compound":
                            return this.getCompoundMethod(l);
                        case "penetrate":
                            return this.getPenetrateMethod(l);
                        case "reroll":
                            return this.getReRollMethod(l);
                        case "rerollOnce":
                            return this.getReRollOnceMethod(l);
                        default:
                            throw new Error(`Mod ${l.type} is not recognised`)
                        }
                    }
                    applySort(l, t) {
                        return l.sort((p,m)=>t.asc ? p.roll - m.roll : m.roll - p.roll),
                        l.forEach((p,m)=>p.order = m),
                        l
                    }
                    getCritSuccessMethod(l, t) {
                        const p = this.rollType(l.expr);
                        return m=>m.map(h=>{
                            if (!h.valid || h.type !== "roll" || h.success)
                                return h;
                            const y = h;
                            return this.successTest(l.mod, p.value, t(h)) ? y.critical = "success" : y.critical === "success" && (y.critical = null),
                            h
                        }
                        )
                    }
                    getCritFailureMethod(l, t) {
                        const p = this.rollType(l.expr);
                        return m=>m.map(h=>{
                            if (!h.valid || h.type !== "roll" || h.success)
                                return h;
                            const y = h;
                            return this.successTest(l.mod, p.value, t(h)) ? y.critical = "failure" : y.critical === "failure" && (y.critical = null),
                            h
                        }
                        )
                    }
                    getSuccessMethod(l, t) {
                        const p = this.rollType(l.expr);
                        return m=>m.map(h=>(h.valid && this.successTest(l.mod, p.value, t(h)) && (h.successes += 1),
                        h))
                    }
                    getFailureMethod(l, t) {
                        const p = this.rollType(l.expr);
                        return m=>m.map(h=>(h.valid && this.successTest(l.mod, p.value, t(h)) && (h.failures += 1),
                        h))
                    }
                    getKeepMethod(l, t) {
                        const p = this.rollType(l.expr);
                        return m=>{
                            if (m.length === 0)
                                return m;
                            m = m.sort((E,R)=>l.highlow === "l" ? t(R) - t(E) : t(E) - t(R)).sort((E,R)=>(E.valid ? 1 : 0) - (R.valid ? 1 : 0));
                            const h = Math.max(Math.min(p.value, m.length), 0);
                            let y = 0
                              , S = 0;
                            const x = m.reduce((E,R)=>(R.valid ? 1 : 0) + E, 0) - h;
                            for (; S < m.length && y < x; )
                                m[S].valid && (m[S].valid = !1,
                                m[S].drop = !0,
                                y++),
                                S++;
                            return m
                        }
                    }
                    getDropMethod(l, t) {
                        const p = this.rollType(l.expr);
                        return m=>{
                            m = m.sort((x,E)=>l.highlow === "h" ? t(E) - t(x) : t(x) - t(E));
                            const h = Math.max(Math.min(p.value, m.length), 0);
                            let y = 0
                              , S = 0;
                            for (; S < m.length && y < h; )
                                m[S].valid && (m[S].valid = !1,
                                m[S].drop = !0,
                                y++),
                                S++;
                            return m
                        }
                    }
                    getExplodeMethod(l) {
                        const t = l.target ? this.rollType(l.target.value) : null;
                        return p=>{
                            const m = t ? h=>this.successTest(l.target.mod, t.value, h.roll) : h=>this.successTest("=", h.type === "fateroll" ? 1 : h.die, h.roll);
                            if (p[0].type === "roll" && m({
                                roll: 1
                            }) && m({
                                roll: p[0].die
                            }))
                                throw new Error("Invalid reroll target");
                            for (let h = 0; h < p.length; h++) {
                                let y = p[h];
                                y.order = h;
                                let S = 0;
                                for (; m(y) && S++ < 1e3; ) {
                                    y.explode = !0;
                                    const x = this.reRoll(y, ++h);
                                    p.splice(h, 0, x),
                                    y = x
                                }
                            }
                            return p
                        }
                    }
                    getCompoundMethod(l) {
                        const t = l.target ? this.rollType(l.target.value) : null;
                        return p=>{
                            const m = t ? h=>this.successTest(l.target.mod, t.value, h.roll) : h=>this.successTest("=", h.type === "fateroll" ? 1 : h.die, h.roll);
                            if (p[0].type === "roll" && m({
                                roll: 1
                            }) && m({
                                roll: p[0].die
                            }))
                                throw new Error("Invalid reroll target");
                            for (let h = 0; h < p.length; h++) {
                                let y = p[h]
                                  , S = y.roll
                                  , x = 0;
                                for (; m(y) && x++ < 1e3; ) {
                                    y.explode = !0;
                                    const E = this.reRoll(y, h + 1);
                                    S += E.roll,
                                    y = E
                                }
                                p[h].value = S,
                                p[h].roll = S
                            }
                            return p
                        }
                    }
                    getPenetrateMethod(l) {
                        const t = l.target ? this.rollType(l.target.value) : null;
                        return p=>{
                            const m = t ? h=>this.successTest(l.target.mod, t.value, h.roll) : h=>this.successTest("=", h.type === "fateroll" ? 1 : h.die, h.roll);
                            if (t && p[0].type === "roll" && m(p[0]) && this.successTest(l.target.mod, t.value, 1))
                                throw new Error("Invalid reroll target");
                            for (let h = 0; h < p.length; h++) {
                                let y = p[h];
                                y.order = h;
                                let S = 0;
                                for (; m(y) && S++ < 1e3; ) {
                                    y.explode = !0;
                                    const x = this.reRoll(y, ++h);
                                    x.value -= 1,
                                    p.splice(h, 0, x),
                                    y = x
                                }
                            }
                            return p
                        }
                    }
                    getReRollMethod(l) {
                        const t = l.target ? this.successTest.bind(null, l.target.mod, this.rollType(l.target.value).value) : this.successTest.bind(null, "=", 1);
                        return p=>{
                            if (p[0].type === "roll" && t(1) && t(p[0].die))
                                throw new Error("Invalid reroll target");
                            for (let m = 0; m < p.length; m++)
                                for (; t(p[m].roll); ) {
                                    p[m].reroll = !0,
                                    p[m].valid = !1;
                                    const h = this.reRoll(p[m], m + 1);
                                    p.splice(++m, 0, h)
                                }
                            return p
                        }
                    }
                    getReRollOnceMethod(l) {
                        const t = l.target ? this.successTest.bind(null, l.target.mod, this.rollType(l.target.value).value) : this.successTest.bind(null, "=", 1);
                        return p=>{
                            if (p[0].type === "roll" && t(1) && t(p[0].die))
                                throw new Error("Invalid reroll target");
                            for (let m = 0; m < p.length; m++)
                                if (t(p[m].roll)) {
                                    p[m].reroll = !0,
                                    p[m].valid = !1;
                                    const h = this.reRoll(p[m], m + 1);
                                    p.splice(++m, 0, h)
                                }
                            return p
                        }
                    }
                    successTest(l, t, p) {
                        switch (l) {
                        case ">":
                            return p >= t;
                        case "<":
                            return p <= t;
                        default:
                            return p == t
                        }
                    }
                    reRoll(l, t) {
                        switch (l.type) {
                        case "roll":
                            return this.generateDiceRoll(l.die, t);
                        case "fateroll":
                            return this.generateFateRoll(t);
                        default:
                            throw new Error(`Cannot do a reroll of a ${l.type}.`)
                        }
                    }
                    generateDiceRoll(l, t) {
                        const p = parseInt((this.randFunction() * l).toFixed(), 10) + 1;
                        return {
                            critical: p === l ? "success" : p === 1 ? "failure" : null,
                            die: l,
                            matched: !1,
                            order: t,
                            roll: p,
                            success: null,
                            successes: 0,
                            failures: 0,
                            type: "roll",
                            valid: !0,
                            value: p
                        }
                    }
                    generateFateRoll(l) {
                        const t = Math.floor(3 * this.randFunction()) - 1;
                        return {
                            matched: !1,
                            order: l,
                            roll: t,
                            success: null,
                            successes: 0,
                            failures: 0,
                            type: "fateroll",
                            valid: !0,
                            value: t
                        }
                    }
                }
            }
            ,
            619: (a,u)=>{
                Object.defineProperty(u, "__esModule", {
                    value: !0
                }),
                u.DiscordRollRenderer = void 0,
                u.DiscordRollRenderer = class {
                    render(r) {
                        return this.doRender(r, !0)
                    }
                    doRender(r, c=!1) {
                        let l = "";
                        switch (r.type) {
                        case "diceexpressionroll":
                            l = this.renderGroupExpr(r);
                            break;
                        case "grouproll":
                            l = this.renderGroup(r);
                            break;
                        case "die":
                            l = this.renderDie(r);
                            break;
                        case "expressionroll":
                            l = this.renderExpression(r);
                            break;
                        case "mathfunction":
                            l = this.renderFunction(r);
                            break;
                        case "roll":
                            return this.renderRoll(r);
                        case "fateroll":
                            return this.renderFateRoll(r);
                        case "number":
                            const t = r.label ? ` (${r.label})` : "";
                            return `${r.value}${t}`;
                        case "fate":
                            return "F";
                        default:
                            throw new Error("Unable to render")
                        }
                        return r.valid || (l = "~~" + l.replace(/~~/g, "") + "~~"),
                        c ? this.stripBrackets(l) : r.label ? `(${r.label}: ${l})` : l
                    }
                    renderGroup(r) {
                        const c = [];
                        for (const l of r.dice)
                            c.push(this.doRender(l));
                        return c.length > 1 ? `{ ${c.join(" + ")} } = ${r.value}` : `{ ${this.stripBrackets(c[0])} } = ${r.value}`
                    }
                    renderGroupExpr(r) {
                        const c = [];
                        for (const l of r.dice)
                            c.push(this.doRender(l));
                        return c.length > 1 ? `(${c.join(" + ")} = ${r.value})` : c[0]
                    }
                    renderDie(r) {
                        const c = [];
                        for (const p of r.rolls)
                            c.push(this.doRender(p));
                        let l = `${c.join(", ")}`;
                        ["number", "fate"].includes(r.die.type) && r.count.type === "number" || (l += `[*Rolling: ${this.doRender(r.count)}d${this.doRender(r.die)}*]`);
                        const t = r.matched ? " Match" + (r.value === 1 ? "" : "es") : "";
                        return l += ` = ${r.value}${t}`,
                        `(${l})`
                    }
                    renderExpression(r) {
                        if (r.dice.length > 1) {
                            const c = [];
                            for (let l = 0; l < r.dice.length - 1; l++)
                                c.push(this.doRender(r.dice[l])),
                                c.push(r.ops[l]);
                            return c.push(this.doRender(r.dice.slice(-1)[0])),
                            c.push("="),
                            c.push(r.value + ""),
                            `(${c.join(" ")})`
                        }
                        return r.dice[0].type === "number" ? r.value + "" : this.doRender(r.dice[0])
                    }
                    renderFunction(r) {
                        const c = this.doRender(r.expr);
                        return `(${r.op}${this.addBrackets(c)} = ${r.value})`
                    }
                    addBrackets(r) {
                        return r.startsWith("(") || (r = `(${r}`),
                        r.endsWith(")") || (r = `${r})`),
                        r
                    }
                    stripBrackets(r) {
                        return r.startsWith("(") && (r = r.substring(1)),
                        r.endsWith(")") && (r = r.substring(0, r.length - 1)),
                        r
                    }
                    renderRoll(r) {
                        let c = `${r.roll}`;
                        return r.valid ? r.success && r.value === 1 ? c = `**${r.roll}**` : r.success && r.value === -1 ? c = `*${r.roll}*` : r.success || r.critical !== "success" ? r.success || r.critical !== "failure" || (c = `*${r.roll}*`) : c = `**${r.roll}**` : c = `~~${r.roll}~~`,
                        r.matched && (c = `__${c}__`),
                        c
                    }
                    renderFateRoll(r) {
                        const c = r.roll === 0 ? "0" : r.roll > 0 ? "+" : "-";
                        let l = `${r.roll}`;
                        return r.valid ? r.success && r.value === 1 ? l = `**${c}**` : r.success && r.value === -1 && (l = `*${c}*`) : l = `~~${c}~~`,
                        r.matched && (l = `__${l}__`),
                        l
                    }
                }
            }
            ,
            607: function(a, u, r) {
                var c = this && this.__createBinding || (Object.create ? function(t, p, m, h) {
                    h === void 0 && (h = m);
                    var y = Object.getOwnPropertyDescriptor(p, m);
                    y && !("get"in y ? !p.__esModule : y.writable || y.configurable) || (y = {
                        enumerable: !0,
                        get: function() {
                            return p[m]
                        }
                    }),
                    Object.defineProperty(t, h, y)
                }
                : function(t, p, m, h) {
                    h === void 0 && (h = m),
                    t[h] = p[m]
                }
                )
                  , l = this && this.__exportStar || function(t, p) {
                    for (var m in t)
                        m === "default" || Object.prototype.hasOwnProperty.call(p, m) || c(p, t, m)
                }
                ;
                Object.defineProperty(u, "__esModule", {
                    value: !0
                }),
                l(r(95), u),
                l(r(604), u),
                l(r(234), u),
                l(r(619), u),
                l(r(54), u)
            },
            604: (a,u)=>{
                Object.defineProperty(u, "__esModule", {
                    value: !0
                })
            }
            ,
            234: (a,u)=>{
                Object.defineProperty(u, "__esModule", {
                    value: !0
                })
            }
            ,
            54: (a,u)=>{
                Object.defineProperty(u, "__esModule", {
                    value: !0
                })
            }
            ,
            51: a=>{
                function u(r, c, l, t) {
                    this.message = r,
                    this.expected = c,
                    this.found = l,
                    this.location = t,
                    this.name = "SyntaxError",
                    typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, u)
                }
                (function(r, c) {
                    function l() {
                        this.constructor = r
                    }
                    l.prototype = c.prototype,
                    r.prototype = new l
                }
                )(u, Error),
                u.buildMessage = function(r, c) {
                    var l = {
                        literal: function(h) {
                            return '"' + p(h.text) + '"'
                        },
                        class: function(h) {
                            var y, S = "";
                            for (y = 0; y < h.parts.length; y++)
                                S += h.parts[y]instanceof Array ? m(h.parts[y][0]) + "-" + m(h.parts[y][1]) : m(h.parts[y]);
                            return "[" + (h.inverted ? "^" : "") + S + "]"
                        },
                        any: function(h) {
                            return "any character"
                        },
                        end: function(h) {
                            return "end of input"
                        },
                        other: function(h) {
                            return h.description
                        }
                    };
                    function t(h) {
                        return h.charCodeAt(0).toString(16).toUpperCase()
                    }
                    function p(h) {
                        return h.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(y) {
                            return "\\x0" + t(y)
                        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(y) {
                            return "\\x" + t(y)
                        })
                    }
                    function m(h) {
                        return h.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(y) {
                            return "\\x0" + t(y)
                        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(y) {
                            return "\\x" + t(y)
                        })
                    }
                    return "Expected " + function(h) {
                        var y, S, x, E = new Array(h.length);
                        for (y = 0; y < h.length; y++)
                            E[y] = (x = h[y],
                            l[x.type](x));
                        if (E.sort(),
                        E.length > 0) {
                            for (y = 1,
                            S = 1; y < E.length; y++)
                                E[y - 1] !== E[y] && (E[S] = E[y],
                                S++);
                            E.length = S
                        }
                        switch (E.length) {
                        case 1:
                            return E[0];
                        case 2:
                            return E[0] + " or " + E[1];
                        default:
                            return E.slice(0, -1).join(", ") + ", or " + E[E.length - 1]
                        }
                    }(r) + " but " + function(h) {
                        return h ? '"' + p(h) + '"' : "end of input"
                    }(c) + " found."
                }
                ,
                a.exports = {
                    SyntaxError: u,
                    parse: function(r, c) {
                        c = c !== void 0 ? c : {};
                        var l, t = {}, p = {
                            start: Lt
                        }, m = Lt, h = {
                            type: "any"
                        }, y = F("[[", !1), S = F("]]", !1), x = function(d, f) {
                            return f && (d.label = f),
                            d
                        }, E = ">", R = F(">", !1), L = "<", V = F("<", !1), U = "=", Y = F("=", !1), ct = F("f", !1), fn = F("cs", !1), pn = F("cf", !1), _n = F("m", !1), mn = F("t", !1), gn = F("k", !1), ht = F("l", !1), ft = F("h", !1), Ne = F("d", !1), vn = F("{", !1), pt = F(",", !1), bn = F("}", !1), ye = "+", we = F("+", !1), yn = F("s", !1), wn = F("a", !1), Cn = F("!", !1), xn = F("!!", !1), En = F("!p", !1), An = F("r", !1), Sn = F("ro", !1), Rn = F("F", !1), Be = F("%", !1), _t = F("(", !1), mt = F(")", !1), $e = F("-", !1), Ie = function(d, f) {
                            return f.length == 0 ? d : {
                                head: d,
                                type: "expression",
                                ops: f.map(_=>({
                                    type: "math",
                                    op: _[1],
                                    tail: _[3]
                                }))
                            }
                        }, gt = F("*", !1), vt = F("/", !1), Ce = "**", bt = F("**", !1), yt = "floor", kn = F("floor", !1), wt = "ceil", On = F("ceil", !1), Ct = "round", Tn = F("round", !1), Fn = F("abs", !1), Ln = Ot("integer"), xt = /^[0-9]/, Et = Ve([["0", "9"]], !1, !1), Dn = F("[", !1), At = /^[^\]]/, St = Ve(["]"], !0, !1), Mn = F("]", !1), Pn = Ot("whitespace"), Rt = /^[ \t\n\r]/, kt = Ve([" ", "	", `
`, "\r"], !1, !1), s = 0, M = 0, xe = [{
                            line: 1,
                            column: 1
                        }], te = 0, He = [], w = 0;
                        if ("startRule"in c) {
                            if (!(c.startRule in p))
                                throw new Error(`Can't start parsing from rule "` + c.startRule + '".');
                            m = p[c.startRule]
                        }
                        function F(d, f) {
                            return {
                                type: "literal",
                                text: d,
                                ignoreCase: f
                            }
                        }
                        function Ve(d, f, _) {
                            return {
                                type: "class",
                                parts: d,
                                inverted: f,
                                ignoreCase: _
                            }
                        }
                        function Ot(d) {
                            return {
                                type: "other",
                                description: d
                            }
                        }
                        function Tt(d) {
                            var f, _ = xe[d];
                            if (_)
                                return _;
                            for (f = d - 1; !xe[f]; )
                                f--;
                            for (_ = {
                                line: (_ = xe[f]).line,
                                column: _.column
                            }; f < d; )
                                r.charCodeAt(f) === 10 ? (_.line++,
                                _.column = 1) : _.column++,
                                f++;
                            return xe[d] = _,
                            _
                        }
                        function Ft(d, f) {
                            var _ = Tt(d)
                              , v = Tt(f);
                            return {
                                start: {
                                    offset: d,
                                    line: _.line,
                                    column: _.column
                                },
                                end: {
                                    offset: f,
                                    line: v.line,
                                    column: v.column
                                }
                            }
                        }
                        function C(d) {
                            s < te || (s > te && (te = s,
                            He = []),
                            He.push(d))
                        }
                        function Lt() {
                            var d, f, _, v, k, A;
                            if (d = s,
                            (f = ze()) !== t) {
                                for (_ = [],
                                r.length > s ? (v = r.charAt(s),
                                s++) : (v = t,
                                w === 0 && C(h)); v !== t; )
                                    _.push(v),
                                    r.length > s ? (v = r.charAt(s),
                                    s++) : (v = t,
                                    w === 0 && C(h));
                                _ !== t ? (M = d,
                                A = _,
                                (k = f).root = !0,
                                A && (k.label = A.join("")),
                                d = f = k) : (s = d,
                                d = t)
                            } else
                                s = d,
                                d = t;
                            return d
                        }
                        function Ee() {
                            var d, f, _;
                            return d = s,
                            r.charCodeAt(s) === 62 ? (f = E,
                            s++) : (f = t,
                            w === 0 && C(R)),
                            f === t && (r.charCodeAt(s) === 60 ? (f = L,
                            s++) : (f = t,
                            w === 0 && C(V)),
                            f === t && (r.charCodeAt(s) === 61 ? (f = U,
                            s++) : (f = t,
                            w === 0 && C(Y)))),
                            f !== t && (_ = ne()) !== t ? (M = d,
                            d = f = {
                                type: "success",
                                mod: f,
                                expr: _
                            }) : (s = d,
                            d = t),
                            d
                        }
                        function Ae() {
                            var d, f, _, v;
                            return d = s,
                            r.charCodeAt(s) === 102 ? (f = "f",
                            s++) : (f = t,
                            w === 0 && C(ct)),
                            f !== t ? (r.charCodeAt(s) === 62 ? (_ = E,
                            s++) : (_ = t,
                            w === 0 && C(R)),
                            _ === t && (r.charCodeAt(s) === 60 ? (_ = L,
                            s++) : (_ = t,
                            w === 0 && C(V)),
                            _ === t && (r.charCodeAt(s) === 61 ? (_ = U,
                            s++) : (_ = t,
                            w === 0 && C(Y)))),
                            _ === t && (_ = null),
                            _ !== t && (v = ne()) !== t ? (M = d,
                            d = f = {
                                type: "failure",
                                mod: _,
                                expr: v
                            }) : (s = d,
                            d = t)) : (s = d,
                            d = t),
                            d
                        }
                        function Dt() {
                            var d, f, _, v;
                            return d = s,
                            r.substr(s, 2) === "cs" ? (f = "cs",
                            s += 2) : (f = t,
                            w === 0 && C(fn)),
                            f !== t ? (r.charCodeAt(s) === 62 ? (_ = E,
                            s++) : (_ = t,
                            w === 0 && C(R)),
                            _ === t && (r.charCodeAt(s) === 60 ? (_ = L,
                            s++) : (_ = t,
                            w === 0 && C(V)),
                            _ === t && (r.charCodeAt(s) === 61 ? (_ = U,
                            s++) : (_ = t,
                            w === 0 && C(Y)))),
                            _ === t && (_ = null),
                            _ !== t && (v = ne()) !== t ? (M = d,
                            d = f = {
                                type: "crit",
                                mod: _,
                                expr: v
                            }) : (s = d,
                            d = t)) : (s = d,
                            d = t),
                            d
                        }
                        function Mt() {
                            var d, f, _, v;
                            return d = s,
                            r.substr(s, 2) === "cf" ? (f = "cf",
                            s += 2) : (f = t,
                            w === 0 && C(pn)),
                            f !== t ? (r.charCodeAt(s) === 62 ? (_ = E,
                            s++) : (_ = t,
                            w === 0 && C(R)),
                            _ === t && (r.charCodeAt(s) === 60 ? (_ = L,
                            s++) : (_ = t,
                            w === 0 && C(V)),
                            _ === t && (r.charCodeAt(s) === 61 ? (_ = U,
                            s++) : (_ = t,
                            w === 0 && C(Y)))),
                            _ === t && (_ = null),
                            _ !== t && (v = ne()) !== t ? (M = d,
                            d = f = {
                                type: "critfail",
                                mod: _,
                                expr: v
                            }) : (s = d,
                            d = t)) : (s = d,
                            d = t),
                            d
                        }
                        function Se() {
                            var d, f, _, v;
                            return d = s,
                            r.charCodeAt(s) === 107 ? (f = "k",
                            s++) : (f = t,
                            w === 0 && C(gn)),
                            f !== t ? (r.charCodeAt(s) === 108 ? (_ = "l",
                            s++) : (_ = t,
                            w === 0 && C(ht)),
                            _ === t && (r.charCodeAt(s) === 104 ? (_ = "h",
                            s++) : (_ = t,
                            w === 0 && C(ft))),
                            _ === t && (_ = null),
                            _ !== t ? ((v = ne()) === t && (v = null),
                            v !== t ? (M = d,
                            d = f = {
                                type: "keep",
                                highlow: _,
                                expr: v || Ut
                            }) : (s = d,
                            d = t)) : (s = d,
                            d = t)) : (s = d,
                            d = t),
                            d
                        }
                        function Re() {
                            var d, f, _, v;
                            return d = s,
                            r.charCodeAt(s) === 100 ? (f = "d",
                            s++) : (f = t,
                            w === 0 && C(Ne)),
                            f !== t ? (r.charCodeAt(s) === 108 ? (_ = "l",
                            s++) : (_ = t,
                            w === 0 && C(ht)),
                            _ === t && (r.charCodeAt(s) === 104 ? (_ = "h",
                            s++) : (_ = t,
                            w === 0 && C(ft))),
                            _ === t && (_ = null),
                            _ !== t ? ((v = ne()) === t && (v = null),
                            v !== t ? (M = d,
                            d = f = {
                                type: "drop",
                                highlow: _,
                                expr: v || Ut
                            }) : (s = d,
                            d = t)) : (s = d,
                            d = t)) : (s = d,
                            d = t),
                            d
                        }
                        function Ue() {
                            var d, f, _, v, k, A, O, D, T, B;
                            if (d = s,
                            (f = Ge()) !== t) {
                                for (_ = [],
                                v = s,
                                (k = N()) !== t ? (r.charCodeAt(s) === 43 ? (A = ye,
                                s++) : (A = t,
                                w === 0 && C(we)),
                                A !== t && (O = N()) !== t && (D = Ge()) !== t ? v = k = [k, A, O, D] : (s = v,
                                v = t)) : (s = v,
                                v = t); v !== t; )
                                    _.push(v),
                                    v = s,
                                    (k = N()) !== t ? (r.charCodeAt(s) === 43 ? (A = ye,
                                    s++) : (A = t,
                                    w === 0 && C(we)),
                                    A !== t && (O = N()) !== t && (D = Ge()) !== t ? v = k = [k, A, O, D] : (s = v,
                                    v = t)) : (s = v,
                                    v = t);
                                _ !== t ? (M = d,
                                T = f,
                                d = f = (B = _).length == 0 ? T : {
                                    head: T,
                                    type: "diceExpression",
                                    ops: B.map(P=>({
                                        type: "math",
                                        op: P[1],
                                        tail: P[3]
                                    }))
                                }) : (s = d,
                                d = t)
                            } else
                                s = d,
                                d = t;
                            return d
                        }
                        function Ge() {
                            var d;
                            return (d = Pt()) === t && (d = ze()),
                            d
                        }
                        function Pt() {
                            var d, f, _;
                            return d = s,
                            f = function() {
                                var v, k, A, O, D;
                                if (v = s,
                                k = function() {
                                    var T, B, P, G, $, j;
                                    if (T = s,
                                    B = function() {
                                        var I, q, z, K;
                                        return I = s,
                                        (q = ne()) === t && (q = null),
                                        q !== t ? (r.charCodeAt(s) === 100 ? (z = "d",
                                        s++) : (z = t,
                                        w === 0 && C(Ne)),
                                        z !== t ? (K = function() {
                                            var Q, X;
                                            return Q = s,
                                            r.charCodeAt(s) === 70 ? (X = "F",
                                            s++) : (X = t,
                                            w === 0 && C(Rn)),
                                            X === t && (r.charCodeAt(s) === 102 ? (X = "f",
                                            s++) : (X = t,
                                            w === 0 && C(ct))),
                                            X !== t && (M = Q,
                                            X = {
                                                type: "fate"
                                            }),
                                            X
                                        }(),
                                        K === t && (K = function() {
                                            var Q, X;
                                            return Q = s,
                                            r.charCodeAt(s) === 37 ? (X = "%",
                                            s++) : (X = t,
                                            w === 0 && C(Be)),
                                            X !== t && (M = Q,
                                            X = {
                                                type: "number",
                                                value: "100"
                                            }),
                                            X
                                        }(),
                                        K === t && (K = ne())),
                                        K !== t ? (M = I,
                                        I = q = {
                                            die: K,
                                            count: q || {
                                                type: "number",
                                                value: 1
                                            },
                                            type: "die"
                                        }) : (s = I,
                                        I = t)) : (s = I,
                                        I = t)) : (s = I,
                                        I = t),
                                        I
                                    }(),
                                    B !== t) {
                                        for (P = [],
                                        (G = Bt()) === t && (G = $t()) === t && (G = Nt()) === t && (G = Ht()) === t && (G = It()); G !== t; )
                                            P.push(G),
                                            (G = Bt()) === t && (G = $t()) === t && (G = Nt()) === t && (G = Ht()) === t && (G = It());
                                        P !== t ? (M = T,
                                        j = P,
                                        ($ = B).mods = ($.mods || []).concat(j),
                                        T = B = $) : (s = T,
                                        T = t)
                                    } else
                                        s = T,
                                        T = t;
                                    return T
                                }(),
                                k !== t) {
                                    for (A = [],
                                    (O = Re()) === t && (O = Se()) === t && (O = Ee()) === t && (O = Ae()) === t && (O = Mt()) === t && (O = Dt()); O !== t; )
                                        A.push(O),
                                        (O = Re()) === t && (O = Se()) === t && (O = Ee()) === t && (O = Ae()) === t && (O = Mt()) === t && (O = Dt());
                                    A !== t ? ((O = function() {
                                        var T, B, P, G, $;
                                        return T = s,
                                        r.charCodeAt(s) === 109 ? (B = "m",
                                        s++) : (B = t,
                                        w === 0 && C(_n)),
                                        B !== t ? (r.charCodeAt(s) === 116 ? (P = "t",
                                        s++) : (P = t,
                                        w === 0 && C(mn)),
                                        P === t && (P = null),
                                        P !== t ? ((G = Ke()) === t && (G = null),
                                        G !== t ? ($ = function() {
                                            var j, I, q;
                                            return j = s,
                                            r.charCodeAt(s) === 62 ? (I = E,
                                            s++) : (I = t,
                                            w === 0 && C(R)),
                                            I === t && (r.charCodeAt(s) === 60 ? (I = L,
                                            s++) : (I = t,
                                            w === 0 && C(V)),
                                            I === t && (r.charCodeAt(s) === 61 ? (I = U,
                                            s++) : (I = t,
                                            w === 0 && C(Y)))),
                                            I !== t && (q = ne()) !== t ? (M = j,
                                            j = I = {
                                                mod: I,
                                                expr: q
                                            }) : (s = j,
                                            j = t),
                                            j
                                        }(),
                                        $ === t && ($ = null),
                                        $ !== t ? (M = T,
                                        T = B = function(j, I, q) {
                                            const z = {
                                                type: "match",
                                                min: I || {
                                                    type: "number",
                                                    value: 2
                                                },
                                                count: !!j
                                            };
                                            return q && (z.mod = q.mod,
                                            z.expr = q.expr),
                                            z
                                        }(P, G, $)) : (s = T,
                                        T = t)) : (s = T,
                                        T = t)) : (s = T,
                                        T = t)) : (s = T,
                                        T = t),
                                        T
                                    }()) === t && (O = null),
                                    O !== t ? (D = function() {
                                        var T, B, P;
                                        return T = s,
                                        r.charCodeAt(s) === 115 ? (B = "s",
                                        s++) : (B = t,
                                        w === 0 && C(yn)),
                                        B !== t ? (r.charCodeAt(s) === 97 ? (P = "a",
                                        s++) : (P = t,
                                        w === 0 && C(wn)),
                                        P === t && (r.charCodeAt(s) === 100 ? (P = "d",
                                        s++) : (P = t,
                                        w === 0 && C(Ne))),
                                        P === t && (P = null),
                                        P !== t ? (M = T,
                                        T = B = P == "d" ? {
                                            type: "sort",
                                            asc: !1
                                        } : {
                                            type: "sort",
                                            asc: !0
                                        }) : (s = T,
                                        T = t)) : (s = T,
                                        T = t),
                                        T
                                    }(),
                                    D === t && (D = null),
                                    D !== t ? (M = v,
                                    v = k = function(T, B, P, G) {
                                        const $ = B.filter(j=>["success", "failure"].includes(j.type));
                                        return B = B.filter(j=>!$.includes(j)),
                                        T.mods = (T.mods || []).concat(B),
                                        $.length > 0 && (T.targets = $),
                                        P && (T.match = P),
                                        G && (T.sort = G),
                                        T
                                    }(k, A, O, D)) : (s = v,
                                    v = t)) : (s = v,
                                    v = t)) : (s = v,
                                    v = t)
                                } else
                                    s = v,
                                    v = t;
                                return v
                            }(),
                            f !== t && N() !== t ? ((_ = ke()) === t && (_ = null),
                            _ !== t ? (M = d,
                            d = f = x(f, _)) : (s = d,
                            d = t)) : (s = d,
                            d = t),
                            d
                        }
                        function Nt() {
                            var d, f, _;
                            return d = s,
                            r.charCodeAt(s) === 33 ? (f = "!",
                            s++) : (f = t,
                            w === 0 && C(Cn)),
                            f !== t ? ((_ = he()) === t && (_ = null),
                            _ !== t ? (M = d,
                            d = f = {
                                type: "explode",
                                target: _
                            }) : (s = d,
                            d = t)) : (s = d,
                            d = t),
                            d
                        }
                        function Bt() {
                            var d, f, _;
                            return d = s,
                            r.substr(s, 2) === "!!" ? (f = "!!",
                            s += 2) : (f = t,
                            w === 0 && C(xn)),
                            f !== t ? ((_ = he()) === t && (_ = null),
                            _ !== t ? (M = d,
                            d = f = {
                                type: "compound",
                                target: _
                            }) : (s = d,
                            d = t)) : (s = d,
                            d = t),
                            d
                        }
                        function $t() {
                            var d, f, _;
                            return d = s,
                            r.substr(s, 2) === "!p" ? (f = "!p",
                            s += 2) : (f = t,
                            w === 0 && C(En)),
                            f !== t ? ((_ = he()) === t && (_ = null),
                            _ !== t ? (M = d,
                            d = f = {
                                type: "penetrate",
                                target: _
                            }) : (s = d,
                            d = t)) : (s = d,
                            d = t),
                            d
                        }
                        function It() {
                            var d, f, _;
                            return d = s,
                            r.charCodeAt(s) === 114 ? (f = "r",
                            s++) : (f = t,
                            w === 0 && C(An)),
                            f !== t ? ((_ = he()) === t && (_ = null),
                            _ !== t ? (M = d,
                            d = f = {
                                type: "reroll",
                                target: _ || Vt
                            }) : (s = d,
                            d = t)) : (s = d,
                            d = t),
                            d
                        }
                        function Ht() {
                            var d, f, _;
                            return d = s,
                            r.substr(s, 2) === "ro" ? (f = "ro",
                            s += 2) : (f = t,
                            w === 0 && C(Sn)),
                            f !== t ? ((_ = he()) === t && (_ = null),
                            _ !== t ? (M = d,
                            d = f = {
                                type: "rerollOnce",
                                target: _ || Vt
                            }) : (s = d,
                            d = t)) : (s = d,
                            d = t),
                            d
                        }
                        function he() {
                            var d, f, _;
                            return d = s,
                            r.charCodeAt(s) === 62 ? (f = E,
                            s++) : (f = t,
                            w === 0 && C(R)),
                            f === t && (r.charCodeAt(s) === 60 ? (f = L,
                            s++) : (f = t,
                            w === 0 && C(V)),
                            f === t && (r.charCodeAt(s) === 61 ? (f = U,
                            s++) : (f = t,
                            w === 0 && C(Y)))),
                            f === t && (f = null),
                            f !== t && (_ = ne()) !== t ? (M = d,
                            d = f = {
                                type: "target",
                                mod: f,
                                value: _
                            }) : (s = d,
                            d = t),
                            d
                        }
                        function ne() {
                            var d;
                            return (d = je()) === t && (d = Ke()),
                            d
                        }
                        function ze() {
                            var d;
                            return (d = function() {
                                var f, _, v, k;
                                return f = s,
                                r.substr(s, 2) === "[[" ? (_ = "[[",
                                s += 2) : (_ = t,
                                w === 0 && C(y)),
                                _ !== t && (v = ze()) !== t ? (r.substr(s, 2) === "]]" ? (k = "]]",
                                s += 2) : (k = t,
                                w === 0 && C(S)),
                                k !== t ? (M = f,
                                f = _ = {
                                    type: "inline",
                                    expr: v
                                }) : (s = f,
                                f = t)) : (s = f,
                                f = t),
                                f
                            }()) === t && (d = Xe()) === t && (d = je()),
                            d
                        }
                        function je() {
                            var d, f, _, v, k, A, O;
                            return d = s,
                            r.charCodeAt(s) === 40 ? (f = "(",
                            s++) : (f = t,
                            w === 0 && C(_t)),
                            f !== t && (_ = Xe()) !== t ? (r.charCodeAt(s) === 41 ? (v = ")",
                            s++) : (v = t,
                            w === 0 && C(mt)),
                            v !== t && N() !== t ? ((k = ke()) === t && (k = null),
                            k !== t ? (M = d,
                            A = _,
                            (O = k) && (A.label = O),
                            d = f = A) : (s = d,
                            d = t)) : (s = d,
                            d = t)) : (s = d,
                            d = t),
                            d
                        }
                        function Xe() {
                            var d, f, _, v, k, A, O, D;
                            if (d = s,
                            (f = We()) !== t) {
                                for (_ = [],
                                v = s,
                                (k = N()) !== t ? (r.charCodeAt(s) === 43 ? (A = ye,
                                s++) : (A = t,
                                w === 0 && C(we)),
                                A === t && (r.charCodeAt(s) === 45 ? (A = "-",
                                s++) : (A = t,
                                w === 0 && C($e))),
                                A !== t && (O = N()) !== t && (D = We()) !== t ? v = k = [k, A, O, D] : (s = v,
                                v = t)) : (s = v,
                                v = t); v !== t; )
                                    _.push(v),
                                    v = s,
                                    (k = N()) !== t ? (r.charCodeAt(s) === 43 ? (A = ye,
                                    s++) : (A = t,
                                    w === 0 && C(we)),
                                    A === t && (r.charCodeAt(s) === 45 ? (A = "-",
                                    s++) : (A = t,
                                    w === 0 && C($e))),
                                    A !== t && (O = N()) !== t && (D = We()) !== t ? v = k = [k, A, O, D] : (s = v,
                                    v = t)) : (s = v,
                                    v = t);
                                _ !== t ? (M = d,
                                d = f = Ie(f, _)) : (s = d,
                                d = t)
                            } else
                                s = d,
                                d = t;
                            return d
                        }
                        function We() {
                            var d, f, _, v, k, A, O, D;
                            if (d = s,
                            (f = Ye()) !== t) {
                                for (_ = [],
                                v = s,
                                (k = N()) !== t ? (r.charCodeAt(s) === 42 ? (A = "*",
                                s++) : (A = t,
                                w === 0 && C(gt)),
                                A === t && (r.charCodeAt(s) === 47 ? (A = "/",
                                s++) : (A = t,
                                w === 0 && C(vt))),
                                A !== t && (O = N()) !== t && (D = Ye()) !== t ? v = k = [k, A, O, D] : (s = v,
                                v = t)) : (s = v,
                                v = t); v !== t; )
                                    _.push(v),
                                    v = s,
                                    (k = N()) !== t ? (r.charCodeAt(s) === 42 ? (A = "*",
                                    s++) : (A = t,
                                    w === 0 && C(gt)),
                                    A === t && (r.charCodeAt(s) === 47 ? (A = "/",
                                    s++) : (A = t,
                                    w === 0 && C(vt))),
                                    A !== t && (O = N()) !== t && (D = Ye()) !== t ? v = k = [k, A, O, D] : (s = v,
                                    v = t)) : (s = v,
                                    v = t);
                                _ !== t ? (M = d,
                                d = f = Ie(f, _)) : (s = d,
                                d = t)
                            } else
                                s = d,
                                d = t;
                            return d
                        }
                        function Ye() {
                            var d, f, _, v, k, A, O, D;
                            if (d = s,
                            (f = qe()) !== t) {
                                for (_ = [],
                                v = s,
                                (k = N()) !== t ? (r.substr(s, 2) === Ce ? (A = Ce,
                                s += 2) : (A = t,
                                w === 0 && C(bt)),
                                A === t && (r.charCodeAt(s) === 37 ? (A = "%",
                                s++) : (A = t,
                                w === 0 && C(Be))),
                                A !== t && (O = N()) !== t && (D = qe()) !== t ? v = k = [k, A, O, D] : (s = v,
                                v = t)) : (s = v,
                                v = t); v !== t; )
                                    _.push(v),
                                    v = s,
                                    (k = N()) !== t ? (r.substr(s, 2) === Ce ? (A = Ce,
                                    s += 2) : (A = t,
                                    w === 0 && C(bt)),
                                    A === t && (r.charCodeAt(s) === 37 ? (A = "%",
                                    s++) : (A = t,
                                    w === 0 && C(Be))),
                                    A !== t && (O = N()) !== t && (D = qe()) !== t ? v = k = [k, A, O, D] : (s = v,
                                    v = t)) : (s = v,
                                    v = t);
                                _ !== t ? (M = d,
                                d = f = Ie(f, _)) : (s = d,
                                d = t)
                            } else
                                s = d,
                                d = t;
                            return d
                        }
                        function qe() {
                            var d;
                            return (d = function() {
                                var f, _, v, k, A;
                                return f = s,
                                _ = function() {
                                    var O;
                                    return r.substr(s, 5) === yt ? (O = yt,
                                    s += 5) : (O = t,
                                    w === 0 && C(kn)),
                                    O === t && (r.substr(s, 4) === wt ? (O = wt,
                                    s += 4) : (O = t,
                                    w === 0 && C(On)),
                                    O === t && (r.substr(s, 5) === Ct ? (O = Ct,
                                    s += 5) : (O = t,
                                    w === 0 && C(Tn)),
                                    O === t && (r.substr(s, 3) === "abs" ? (O = "abs",
                                    s += 3) : (O = t,
                                    w === 0 && C(Fn))))),
                                    O
                                }(),
                                _ !== t && N() !== t ? (r.charCodeAt(s) === 40 ? (v = "(",
                                s++) : (v = t,
                                w === 0 && C(_t)),
                                v !== t && N() !== t && (k = Xe()) !== t && N() !== t ? (r.charCodeAt(s) === 41 ? (A = ")",
                                s++) : (A = t,
                                w === 0 && C(mt)),
                                A !== t ? (M = f,
                                f = _ = {
                                    type: "mathfunction",
                                    op: _,
                                    expr: k
                                }) : (s = f,
                                f = t)) : (s = f,
                                f = t)) : (s = f,
                                f = t),
                                f
                            }()) === t && (d = function() {
                                var f, _, v;
                                return f = s,
                                _ = function() {
                                    var k, A, O, D, T, B, P, G;
                                    if (k = s,
                                    A = function() {
                                        var $, j, I, q, z, K, Q, X, Oe;
                                        if ($ = s,
                                        r.charCodeAt(s) === 123 ? (j = "{",
                                        s++) : (j = t,
                                        w === 0 && C(vn)),
                                        j !== t)
                                            if (N() !== t)
                                                if ((I = Ue()) !== t) {
                                                    for (q = [],
                                                    z = s,
                                                    (K = N()) !== t ? (r.charCodeAt(s) === 44 ? (Q = ",",
                                                    s++) : (Q = t,
                                                    w === 0 && C(pt)),
                                                    Q !== t && (X = N()) !== t && (Oe = Ue()) !== t ? z = K = [K, Q, X, Oe] : (s = z,
                                                    z = t)) : (s = z,
                                                    z = t); z !== t; )
                                                        q.push(z),
                                                        z = s,
                                                        (K = N()) !== t ? (r.charCodeAt(s) === 44 ? (Q = ",",
                                                        s++) : (Q = t,
                                                        w === 0 && C(pt)),
                                                        Q !== t && (X = N()) !== t && (Oe = Ue()) !== t ? z = K = [K, Q, X, Oe] : (s = z,
                                                        z = t)) : (s = z,
                                                        z = t);
                                                    q !== t && (z = N()) !== t ? (r.charCodeAt(s) === 125 ? (K = "}",
                                                    s++) : (K = t,
                                                    w === 0 && C(bn)),
                                                    K !== t ? (M = $,
                                                    $ = j = {
                                                        rolls: [I, ...q.map(Nn=>Nn[3])],
                                                        type: "group"
                                                    }) : (s = $,
                                                    $ = t)) : (s = $,
                                                    $ = t)
                                                } else
                                                    s = $,
                                                    $ = t;
                                            else
                                                s = $,
                                                $ = t;
                                        else
                                            s = $,
                                            $ = t;
                                        return $
                                    }(),
                                    A !== t) {
                                        for (O = [],
                                        (D = Se()) === t && (D = Re()) === t && (D = Ee()) === t && (D = Ae()); D !== t; )
                                            O.push(D),
                                            (D = Se()) === t && (D = Re()) === t && (D = Ee()) === t && (D = Ae());
                                        O !== t && (D = N()) !== t ? ((T = ke()) === t && (T = null),
                                        T !== t ? (M = k,
                                        B = A,
                                        G = T,
                                        (P = O).length > 0 && (B.mods = (B.mods || []).concat(P)),
                                        G && (B.label = G),
                                        k = A = B) : (s = k,
                                        k = t)) : (s = k,
                                        k = t)
                                    } else
                                        s = k,
                                        k = t;
                                    return k
                                }(),
                                _ === t && (_ = Pt()) === t && (_ = Ke()),
                                _ !== t && N() !== t ? ((v = ke()) === t && (v = null),
                                v !== t ? (M = f,
                                f = _ = x(_, v)) : (s = f,
                                f = t)) : (s = f,
                                f = t),
                                f
                            }()) === t && (d = je()),
                            d
                        }
                        function Ke() {
                            var d, f, _, v;
                            if (w++,
                            d = s,
                            r.charCodeAt(s) === 45 ? (f = "-",
                            s++) : (f = t,
                            w === 0 && C($e)),
                            f === t && (f = null),
                            f !== t) {
                                if (_ = [],
                                xt.test(r.charAt(s)) ? (v = r.charAt(s),
                                s++) : (v = t,
                                w === 0 && C(Et)),
                                v !== t)
                                    for (; v !== t; )
                                        _.push(v),
                                        xt.test(r.charAt(s)) ? (v = r.charAt(s),
                                        s++) : (v = t,
                                        w === 0 && C(Et));
                                else
                                    _ = t;
                                _ !== t ? (M = d,
                                d = f = {
                                    type: "number",
                                    value: parseInt(r.substring(M, s), 10)
                                }) : (s = d,
                                d = t)
                            } else
                                s = d,
                                d = t;
                            return w--,
                            d === t && (f = t,
                            w === 0 && C(Ln)),
                            d
                        }
                        function ke() {
                            var d, f, _, v;
                            if (d = s,
                            r.charCodeAt(s) === 91 ? (f = "[",
                            s++) : (f = t,
                            w === 0 && C(Dn)),
                            f !== t) {
                                if (_ = [],
                                At.test(r.charAt(s)) ? (v = r.charAt(s),
                                s++) : (v = t,
                                w === 0 && C(St)),
                                v !== t)
                                    for (; v !== t; )
                                        _.push(v),
                                        At.test(r.charAt(s)) ? (v = r.charAt(s),
                                        s++) : (v = t,
                                        w === 0 && C(St));
                                else
                                    _ = t;
                                _ !== t ? (r.charCodeAt(s) === 93 ? (v = "]",
                                s++) : (v = t,
                                w === 0 && C(Mn)),
                                v !== t ? (M = d,
                                d = f = _.join("")) : (s = d,
                                d = t)) : (s = d,
                                d = t)
                            } else
                                s = d,
                                d = t;
                            return d
                        }
                        function N() {
                            var d, f;
                            for (w++,
                            d = [],
                            Rt.test(r.charAt(s)) ? (f = r.charAt(s),
                            s++) : (f = t,
                            w === 0 && C(kt)); f !== t; )
                                d.push(f),
                                Rt.test(r.charAt(s)) ? (f = r.charAt(s),
                                s++) : (f = t,
                                w === 0 && C(kt));
                            return w--,
                            d === t && (f = t,
                            w === 0 && C(Pn)),
                            d
                        }
                        const Vt = {
                            type: "target",
                            mod: "=",
                            value: {
                                type: "number",
                                value: 1
                            }
                        }
                          , Ut = {
                            type: "number",
                            value: 1
                        };
                        if ((l = m()) !== t && s === r.length)
                            return l;
                        throw l !== t && s < r.length && C({
                            type: "end"
                        }),
                        Je = He,
                        Qe = te < r.length ? r.charAt(te) : null,
                        Gt = te < r.length ? Ft(te, te + 1) : Ft(te, te),
                        new u(u.buildMessage(Je, Qe),Je,Qe,Gt);
                        var Je, Qe, Gt
                    }
                }
            }
        }
          , o = {};
        return function a(u) {
            var r = o[u];
            if (r !== void 0)
                return r.exports;
            var c = o[u] = {
                exports: {}
            };
            return n[u].call(c.exports, c, c.exports, a),
            c.exports
        }(607)
    }
    )())
}
)(rn);
var jn = rn.exports;
let et = 0;
class sn {
    constructor(e={}) {
        this.rollsAsFloats = [],
        this.dieGroups = [],
        this.parsedNotation = null,
        this.finalResults = null,
        this.targetRollsCritSuccess = (e == null ? void 0 : e.targetRollsCritSuccess) || (e == null ? void 0 : e.targetRollsCrit) || !1,
        this.targetRollsCritFailure = (e == null ? void 0 : e.targetRollsCritFailure) || (e == null ? void 0 : e.targetRollsCrit) || !1,
        this.initParser()
    }
    initParser() {
        this.rollParser = new jn.DiceRoller((e=this.rollsAsFloats)=>e.length > 0 ? e[et++] : (console.warn("No result was passed to the dice-roller-parser. Using fallback Math.random"),
        Math.random()))
    }
    parseNotation(e) {
        this.clear(),
        e = e.replace(/d00/, "d%"),
        this.parsedNotation = this.rollParser.parse(e);
        const n = o=>{
            const a = o.die.value || o.die.type;
            this.dieGroups.push({
                qty: o.count.value,
                sides: a,
                mods: o.mods
            })
        }
        ;
        // Custom
        const rollers = document.getElementById('rollers');
        rollers.classList.add("hideEffect", "hidden");
        return this.recursiveSearch(this.parsedNotation, "die", [], n),
        this.dieGroups
    }
    rollNotation(e) {
        return this.finalResults = this.rollParser.rollParsed(e),
        this.finalResults
    }
    clear() {
        et = 0,
        this.rollsAsFloats = [],
        this.dieGroups = [],
        this.parsedNotation = null,
        this.finalResults = null
    }
    recursiveSearch(e, n, o=[], a) {
        const u = o;
        return Object.keys(e).forEach(r=>{
            const c = e[r];
            r === n ? (u.push(c),
            a && typeof a == "function" && a(e)) : c && typeof c == "object" && this.recursiveSearch(c, n, u, a)
        }
        ),
        u
    }
    incrementId(e) {
        e = e.toString();
        let n = e.split(".");
        return n[1] ? n[1] = parseInt(n[1]) + 1 : n[1] = 1,
        n[0] + "." + n[1]
    }
    handleRerolls(e=[]) {
        const n = [];
        return e.forEach((o,a)=>{
            var u;
            if (((u = o.mods) == null ? void 0 : u.length) > 0) {
                const r = (t,p,m)=>{
                    switch (p) {
                    case ">":
                        return t >= m;
                    case "<":
                        return t <= m;
                    case "=":
                    default:
                        return t == m
                    }
                }
                  , c = o.rolls.map(t=>t.rollId)
                  , l = t=>{
                    const p = this.incrementId(t);
                    return c.includes(p)
                }
                ;
                o.mods.forEach(t=>{
                    const p = {
                        ...o.rolls
                    };
                    switch (t.type) {
                    case "explode":
                    case "compound":
                        Object.entries(p).forEach(([m,h])=>{
                            var E, R, L;
                            const y = h.sides
                              , S = ((R = (E = t.target) == null ? void 0 : E.value) == null ? void 0 : R.value) || y
                              , x = ((L = t.target) == null ? void 0 : L.mod) || ">";
                            r(h.value, x, S) && !l(h.rollId) && n.push({
                                groupId: a,
                                rollId: this.incrementId(h.rollId),
                                sides: h.sides,
                                qty: 1
                            })
                        }
                        );
                        break;
                    case "penetrate":
                        Object.entries(p).forEach(([m,h])=>{
                            var E, R, L;
                            const y = h.sides
                              , S = ((R = (E = t.target) == null ? void 0 : E.value) == null ? void 0 : R.value) || y
                              , x = ((L = t.target) == null ? void 0 : L.mod) || "=";
                            r(h.value, x, S) && !l(h.rollId) && n.push({
                                groupId: a,
                                rollId: this.incrementId(h.rollId),
                                sides: h.sides,
                                qty: 1
                            })
                        }
                        );
                        break;
                    case "reroll":
                        Object.entries(p).forEach(([m,h])=>{
                            h.sides,
                            r(h.value, t.target.mod, t.target.value.value) && !l(h.rollId) && n.push({
                                groupId: a,
                                rollId: this.incrementId(h.rollId),
                                sides: h.sides,
                                qty: 1
                            })
                        }
                        );
                        break;
                    case "rerollOnce":
                        Object.entries(p).forEach(([m,h])=>{
                            var x, E;
                            const y = (E = (x = t.target) == null ? void 0 : x.value) == null ? void 0 : E.value
                              , S = t.target.mod;
                            r(h.value, S, y) && !l(h.rollId) && !h.rollId.toString().includes(".") && n.push({
                                groupId: a,
                                rollId: this.incrementId(h.rollId),
                                sides: h.sides,
                                qty: 1
                            })
                        }
                        );
                        break
                    }
                }
                )
            }
        }
        ),
        n
    }
    handleTargetCritSuccess(e=[]) {
        e.rolls.forEach(n=>{
            n.successes >= 1 && n.critical === "success" && (n.successes += 1,
            e.value += 1)
        }
        )
    }
    handleTargetCritFailure(e=[]) {
        e.rolls.forEach(n=>{
            n.failures >= 1 && n.critical === "failure" && (n.failures += 1,
            e.value -= 1)
        }
        )
    }
    parseFinalResults(e=[]) {
        let n = this.recursiveSearch(e, "rolls");
        (n.length ? n : [e]).forEach(u=>Object.entries(u).forEach(([r,c])=>{
            try {
                let l = c.sides;
                const t = /[dD]\d+/i;
                typeof l == "string" && l.match(t) && (l = parseInt(c.sides.substring(1))),
                l && (l === "fate" ? this.rollsAsFloats.push((c.value + 2) * .25) : this.rollsAsFloats.push((c.value - 1) / l))
            } catch {
                throw console.error("This object is not a properly formatted roll object.", c),
                new Error("Unable to parse final results")
            }
        }
        ));
        const a = this.rollParser.rollParsed(this.parsedNotation);
        return this.targetRollsCritSuccess && a.success !== null && this.handleTargetCritSuccess(a),
        this.targetRollsCritFailure && a.success !== null && this.handleTargetCritFailure(a),
        this.finalResults = a,
        et = 0,
        this.rollsAsFloats = [],
        a
    }
}
const Te = ()=>{}
;
class Xn {
    constructor(e) {
        this.target = e.target ? document.querySelector(e.target) : document.body,
        this.elem = document.createRange().createContextualFragment(`
			<div class="adv-roller">
				<form class="adv-roller--form">
					<input class="adv-roller--notation" placeholder="2d20" autocomplete="off" />
					<input class="adv-roller--clear" type="reset" value="Clear" />
				</form>
			</div>
		`),
        this.form = this.elem.querySelector(".adv-roller--form"),
        this.DRP = new sn({
            targetRollsCritSuccess: (e == null ? void 0 : e.targetRollsCritSuccess) || (e == null ? void 0 : e.targetRollsCritSuccess) || !1,
            targetRollsCritFailure: (e == null ? void 0 : e.targetRollsCritFailure) || (e == null ? void 0 : e.targetRollsCrit) || !1,
            targetRollsCrit: (e == null ? void 0 : e.targetRollsCrit) || !1
        }),
        this.onSubmit = (e == null ? void 0 : e.onSubmit) || Te,
        this.onClear = (e == null ? void 0 : e.onClear) || Te,
        this.onReroll = (e == null ? void 0 : e.onReroll) || Te,
        this.onResults = (e == null ? void 0 : e.onResults) || Te,
        this.init()
    }
    init() {
        this.form.addEventListener("submit", this.submitForm.bind(this)),
        this.form.addEventListener("reset", this.clear.bind(this)),
        this.target.prepend(this.elem)
    }
    submitForm(e) {
        e.preventDefault(),
        this.clear(),
        this.onSubmit(this.DRP.parseNotation(this.form.firstElementChild.value))
    }
    clear() {
        this.DRP.clear(),
        this.onClear && this.onClear();
    }
    handleResults(e) {
        const n = /[dD]\d+/i;
        e.forEach(r=>{
            typeof r.sides == "string" && r.sides.match(n) && (r.sides = parseInt(r.sides.substring(1))),
            r.rolls.forEach(c=>{
                typeof c.sides == "string" && c.sides.match(n) && (c.sides = parseInt(c.sides.substring(1)))
            }
            )
        }
        );
        const o = this.DRP.handleRerolls(e);
        if (o.length)
            return this.onReroll(o),
            o;
        const a = this.DRP.parsedNotation ? this.DRP.parseFinalResults(e) : e
          , u = new CustomEvent("resultsAvailable",{
            detail: a
        });
        return document.dispatchEvent(u),
        this.onResults(a),
        a
    }
}
function Wn(i) {
    if (i && !(typeof window > "u")) {
        var e = document.createElement("style");
        return e.setAttribute("type", "text/css"),
        e.innerHTML = i,
        document.head.appendChild(e),
        i
    }
}
function ce(i, e) {
    var n = i.__state.conversionName.toString()
      , o = Math.round(i.r)
      , a = Math.round(i.g)
      , u = Math.round(i.b)
      , r = i.a
      , c = Math.round(i.h)
      , l = i.s.toFixed(1)
      , t = i.v.toFixed(1);
    if (e || n === "THREE_CHAR_HEX" || n === "SIX_CHAR_HEX") {
        for (var p = i.hex.toString(16); p.length < 6; )
            p = "0" + p;
        return "#" + p
    } else {
        if (n === "CSS_RGB")
            return "rgb(" + o + "," + a + "," + u + ")";
        if (n === "CSS_RGBA")
            return "rgba(" + o + "," + a + "," + u + "," + r + ")";
        if (n === "HEX")
            return "0x" + i.hex.toString(16);
        if (n === "RGB_ARRAY")
            return "[" + o + "," + a + "," + u + "]";
        if (n === "RGBA_ARRAY")
            return "[" + o + "," + a + "," + u + "," + r + "]";
        if (n === "RGB_OBJ")
            return "{r:" + o + ",g:" + a + ",b:" + u + "}";
        if (n === "RGBA_OBJ")
            return "{r:" + o + ",g:" + a + ",b:" + u + ",a:" + r + "}";
        if (n === "HSV_OBJ")
            return "{h:" + c + ",s:" + l + ",v:" + t + "}";
        if (n === "HSVA_OBJ")
            return "{h:" + c + ",s:" + l + ",v:" + t + ",a:" + r + "}"
    }
    return "unknown format"
}
var zt = Array.prototype.forEach
  , fe = Array.prototype.slice
  , b = {
    BREAK: {},
    extend: function(e) {
        return this.each(fe.call(arguments, 1), function(n) {
            var o = this.isObject(n) ? Object.keys(n) : [];
            o.forEach((function(a) {
                this.isUndefined(n[a]) || (e[a] = n[a])
            }
            ).bind(this))
        }, this),
        e
    },
    defaults: function(e) {
        return this.each(fe.call(arguments, 1), function(n) {
            var o = this.isObject(n) ? Object.keys(n) : [];
            o.forEach((function(a) {
                this.isUndefined(e[a]) && (e[a] = n[a])
            }
            ).bind(this))
        }, this),
        e
    },
    compose: function() {
        var e = fe.call(arguments);
        return function() {
            for (var n = fe.call(arguments), o = e.length - 1; o >= 0; o--)
                n = [e[o].apply(this, n)];
            return n[0]
        }
    },
    each: function(e, n, o) {
        if (e) {
            if (zt && e.forEach && e.forEach === zt)
                e.forEach(n, o);
            else if (e.length === e.length + 0) {
                var a = void 0
                  , u = void 0;
                for (a = 0,
                u = e.length; a < u; a++)
                    if (a in e && n.call(o, e[a], a) === this.BREAK)
                        return
            } else
                for (var r in e)
                    if (n.call(o, e[r], r) === this.BREAK)
                        return
        }
    },
    defer: function(e) {
        setTimeout(e, 0)
    },
    debounce: function(e, n, o) {
        var a = void 0;
        return function() {
            var u = this
              , r = arguments;
            function c() {
                a = null,
                o || e.apply(u, r)
            }
            var l = o || !a;
            clearTimeout(a),
            a = setTimeout(c, n),
            l && e.apply(u, r)
        }
    },
    toArray: function(e) {
        return e.toArray ? e.toArray() : fe.call(e)
    },
    isUndefined: function(e) {
        return e === void 0
    },
    isNull: function(e) {
        return e === null
    },
    isNaN: function(i) {
        function e(n) {
            return i.apply(this, arguments)
        }
        return e.toString = function() {
            return i.toString()
        }
        ,
        e
    }(function(i) {
        return isNaN(i)
    }),
    isArray: Array.isArray || function(i) {
        return i.constructor === Array
    }
    ,
    isObject: function(e) {
        return e === Object(e)
    },
    isNumber: function(e) {
        return e === e + 0
    },
    isString: function(e) {
        return e === e + ""
    },
    isBoolean: function(e) {
        return e === !1 || e === !0
    },
    isFunction: function(e) {
        return e instanceof Function
    }
}
  , Yn = [{
    litmus: b.isString,
    conversions: {
        THREE_CHAR_HEX: {
            read: function(e) {
                var n = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                return n === null ? !1 : {
                    space: "HEX",
                    hex: parseInt("0x" + n[1].toString() + n[1].toString() + n[2].toString() + n[2].toString() + n[3].toString() + n[3].toString(), 0)
                }
            },
            write: ce
        },
        SIX_CHAR_HEX: {
            read: function(e) {
                var n = e.match(/^#([A-F0-9]{6})$/i);
                return n === null ? !1 : {
                    space: "HEX",
                    hex: parseInt("0x" + n[1].toString(), 0)
                }
            },
            write: ce
        },
        CSS_RGB: {
            read: function(e) {
                var n = e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);
                return n === null ? !1 : {
                    space: "RGB",
                    r: parseFloat(n[1]),
                    g: parseFloat(n[2]),
                    b: parseFloat(n[3])
                }
            },
            write: ce
        },
        CSS_RGBA: {
            read: function(e) {
                var n = e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);
                return n === null ? !1 : {
                    space: "RGB",
                    r: parseFloat(n[1]),
                    g: parseFloat(n[2]),
                    b: parseFloat(n[3]),
                    a: parseFloat(n[4])
                }
            },
            write: ce
        }
    }
}, {
    litmus: b.isNumber,
    conversions: {
        HEX: {
            read: function(e) {
                return {
                    space: "HEX",
                    hex: e,
                    conversionName: "HEX"
                }
            },
            write: function(e) {
                return e.hex
            }
        }
    }
}, {
    litmus: b.isArray,
    conversions: {
        RGB_ARRAY: {
            read: function(e) {
                return e.length !== 3 ? !1 : {
                    space: "RGB",
                    r: e[0],
                    g: e[1],
                    b: e[2]
                }
            },
            write: function(e) {
                return [e.r, e.g, e.b]
            }
        },
        RGBA_ARRAY: {
            read: function(e) {
                return e.length !== 4 ? !1 : {
                    space: "RGB",
                    r: e[0],
                    g: e[1],
                    b: e[2],
                    a: e[3]
                }
            },
            write: function(e) {
                return [e.r, e.g, e.b, e.a]
            }
        }
    }
}, {
    litmus: b.isObject,
    conversions: {
        RGBA_OBJ: {
            read: function(e) {
                return b.isNumber(e.r) && b.isNumber(e.g) && b.isNumber(e.b) && b.isNumber(e.a) ? {
                    space: "RGB",
                    r: e.r,
                    g: e.g,
                    b: e.b,
                    a: e.a
                } : !1
            },
            write: function(e) {
                return {
                    r: e.r,
                    g: e.g,
                    b: e.b,
                    a: e.a
                }
            }
        },
        RGB_OBJ: {
            read: function(e) {
                return b.isNumber(e.r) && b.isNumber(e.g) && b.isNumber(e.b) ? {
                    space: "RGB",
                    r: e.r,
                    g: e.g,
                    b: e.b
                } : !1
            },
            write: function(e) {
                return {
                    r: e.r,
                    g: e.g,
                    b: e.b
                }
            }
        },
        HSVA_OBJ: {
            read: function(e) {
                return b.isNumber(e.h) && b.isNumber(e.s) && b.isNumber(e.v) && b.isNumber(e.a) ? {
                    space: "HSV",
                    h: e.h,
                    s: e.s,
                    v: e.v,
                    a: e.a
                } : !1
            },
            write: function(e) {
                return {
                    h: e.h,
                    s: e.s,
                    v: e.v,
                    a: e.a
                }
            }
        },
        HSV_OBJ: {
            read: function(e) {
                return b.isNumber(e.h) && b.isNumber(e.s) && b.isNumber(e.v) ? {
                    space: "HSV",
                    h: e.h,
                    s: e.s,
                    v: e.v
                } : !1
            },
            write: function(e) {
                return {
                    h: e.h,
                    s: e.s,
                    v: e.v
                }
            }
        }
    }
}]
  , pe = void 0
  , Fe = void 0
  , nt = function() {
    Fe = !1;
    var e = arguments.length > 1 ? b.toArray(arguments) : arguments[0];
    return b.each(Yn, function(n) {
        if (n.litmus(e))
            return b.each(n.conversions, function(o, a) {
                if (pe = o.read(e),
                Fe === !1 && pe !== !1)
                    return Fe = pe,
                    pe.conversionName = a,
                    pe.conversion = o,
                    b.BREAK
            }),
            b.BREAK
    }),
    Fe
}
  , jt = void 0
  , Me = {
    hsv_to_rgb: function(e, n, o) {
        var a = Math.floor(e / 60) % 6
          , u = e / 60 - Math.floor(e / 60)
          , r = o * (1 - n)
          , c = o * (1 - u * n)
          , l = o * (1 - (1 - u) * n)
          , t = [[o, l, r], [c, o, r], [r, o, l], [r, c, o], [l, r, o], [o, r, c]][a];
        return {
            r: t[0] * 255,
            g: t[1] * 255,
            b: t[2] * 255
        }
    },
    rgb_to_hsv: function(e, n, o) {
        var a = Math.min(e, n, o)
          , u = Math.max(e, n, o)
          , r = u - a
          , c = void 0
          , l = void 0;
        if (u !== 0)
            l = r / u;
        else
            return {
                h: NaN,
                s: 0,
                v: 0
            };
        return e === u ? c = (n - o) / r : n === u ? c = 2 + (o - e) / r : c = 4 + (e - n) / r,
        c /= 6,
        c < 0 && (c += 1),
        {
            h: c * 360,
            s: l,
            v: u / 255
        }
    },
    rgb_to_hex: function(e, n, o) {
        var a = this.hex_with_component(0, 2, e);
        return a = this.hex_with_component(a, 1, n),
        a = this.hex_with_component(a, 0, o),
        a
    },
    component_from_hex: function(e, n) {
        return e >> n * 8 & 255
    },
    hex_with_component: function(e, n, o) {
        return o << (jt = n * 8) | e & ~(255 << jt)
    }
}
  , qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
    return typeof i
}
: function(i) {
    return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i
}
  , Z = function(i, e) {
    if (!(i instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
  , ee = function() {
    function i(e, n) {
        for (var o = 0; o < n.length; o++) {
            var a = n[o];
            a.enumerable = a.enumerable || !1,
            a.configurable = !0,
            "value"in a && (a.writable = !0),
            Object.defineProperty(e, a.key, a)
        }
    }
    return function(e, n, o) {
        return n && i(e.prototype, n),
        o && i(e, o),
        e
    }
}()
  , ie = function i(e, n, o) {
    e === null && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (a === void 0) {
        var u = Object.getPrototypeOf(e);
        return u === null ? void 0 : i(u, n, o)
    } else {
        if ("value"in a)
            return a.value;
        var r = a.get;
        return r === void 0 ? void 0 : r.call(o)
    }
}
  , se = function(i, e) {
    if (typeof e != "function" && e !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    i.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: i,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    e && (Object.setPrototypeOf ? Object.setPrototypeOf(i, e) : i.__proto__ = e)
}
  , oe = function(i, e) {
    if (!i)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e && (typeof e == "object" || typeof e == "function") ? e : i
}
  , W = function() {
    function i() {
        if (Z(this, i),
        this.__state = nt.apply(this, arguments),
        this.__state === !1)
            throw new Error("Failed to interpret color arguments");
        this.__state.a = this.__state.a || 1
    }
    return ee(i, [{
        key: "toString",
        value: function() {
            return ce(this)
        }
    }, {
        key: "toHexString",
        value: function() {
            return ce(this, !0)
        }
    }, {
        key: "toOriginal",
        value: function() {
            return this.__state.conversion.write(this)
        }
    }]),
    i
}();
function lt(i, e, n) {
    Object.defineProperty(i, e, {
        get: function() {
            return this.__state.space === "RGB" ? this.__state[e] : (W.recalculateRGB(this, e, n),
            this.__state[e])
        },
        set: function(a) {
            this.__state.space !== "RGB" && (W.recalculateRGB(this, e, n),
            this.__state.space = "RGB"),
            this.__state[e] = a
        }
    })
}
function ut(i, e) {
    Object.defineProperty(i, e, {
        get: function() {
            return this.__state.space === "HSV" ? this.__state[e] : (W.recalculateHSV(this),
            this.__state[e])
        },
        set: function(o) {
            this.__state.space !== "HSV" && (W.recalculateHSV(this),
            this.__state.space = "HSV"),
            this.__state[e] = o
        }
    })
}
W.recalculateRGB = function(i, e, n) {
    if (i.__state.space === "HEX")
        i.__state[e] = Me.component_from_hex(i.__state.hex, n);
    else if (i.__state.space === "HSV")
        b.extend(i.__state, Me.hsv_to_rgb(i.__state.h, i.__state.s, i.__state.v));
    else
        throw new Error("Corrupted color state")
}
;
W.recalculateHSV = function(i) {
    var e = Me.rgb_to_hsv(i.r, i.g, i.b);
    b.extend(i.__state, {
        s: e.s,
        v: e.v
    }),
    b.isNaN(e.h) ? b.isUndefined(i.__state.h) && (i.__state.h = 0) : i.__state.h = e.h
}
;
W.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"];
lt(W.prototype, "r", 2);
lt(W.prototype, "g", 1);
lt(W.prototype, "b", 0);
ut(W.prototype, "h");
ut(W.prototype, "s");
ut(W.prototype, "v");
Object.defineProperty(W.prototype, "a", {
    get: function() {
        return this.__state.a
    },
    set: function(e) {
        this.__state.a = e
    }
});
Object.defineProperty(W.prototype, "hex", {
    get: function() {
        return this.__state.space !== "HEX" && (this.__state.hex = Me.rgb_to_hex(this.r, this.g, this.b),
        this.__state.space = "HEX"),
        this.__state.hex
    },
    set: function(e) {
        this.__state.space = "HEX",
        this.__state.hex = e
    }
});
var le = function() {
    function i(e, n) {
        Z(this, i),
        this.initialValue = e[n],
        this.domElement = document.createElement("div"),
        this.object = e,
        this.property = n,
        this.__onChange = void 0,
        this.__onFinishChange = void 0
    }
    return ee(i, [{
        key: "onChange",
        value: function(n) {
            return this.__onChange = n,
            this
        }
    }, {
        key: "onFinishChange",
        value: function(n) {
            return this.__onFinishChange = n,
            this
        }
    }, {
        key: "setValue",
        value: function(n) {
            return this.object[this.property] = n,
            this.__onChange && this.__onChange.call(this, n),
            this.updateDisplay(),
            this
        }
    }, {
        key: "getValue",
        value: function() {
            return this.object[this.property]
        }
    }, {
        key: "updateDisplay",
        value: function() {
            return this
        }
    }, {
        key: "isModified",
        value: function() {
            return this.initialValue !== this.getValue()
        }
    }]),
    i
}()
  , Kn = {
    HTMLEvents: ["change"],
    MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
    KeyboardEvents: ["keydown"]
}
  , on = {};
b.each(Kn, function(i, e) {
    b.each(i, function(n) {
        on[n] = e
    })
});
var Jn = /(\d+(\.\d+)?)px/;
function re(i) {
    if (i === "0" || b.isUndefined(i))
        return 0;
    var e = i.match(Jn);
    return b.isNull(e) ? 0 : parseFloat(e[1])
}
var g = {
    makeSelectable: function(e, n) {
        e === void 0 || e.style === void 0 || (e.onselectstart = n ? function() {
            return !1
        }
        : function() {}
        ,
        e.style.MozUserSelect = n ? "auto" : "none",
        e.style.KhtmlUserSelect = n ? "auto" : "none",
        e.unselectable = n ? "on" : "off")
    },
    makeFullscreen: function(e, n, o) {
        var a = o
          , u = n;
        b.isUndefined(u) && (u = !0),
        b.isUndefined(a) && (a = !0),
        e.style.position = "absolute",
        u && (e.style.left = 0,
        e.style.right = 0),
        a && (e.style.top = 0,
        e.style.bottom = 0)
    },
    fakeEvent: function(e, n, o, a) {
        var u = o || {}
          , r = on[n];
        if (!r)
            throw new Error("Event type " + n + " not supported.");
        var c = document.createEvent(r);
        switch (r) {
        case "MouseEvents":
            {
                var l = u.x || u.clientX || 0
                  , t = u.y || u.clientY || 0;
                c.initMouseEvent(n, u.bubbles || !1, u.cancelable || !0, window, u.clickCount || 1, 0, 0, l, t, !1, !1, !1, !1, 0, null);
                break
            }
        case "KeyboardEvents":
            {
                var p = c.initKeyboardEvent || c.initKeyEvent;
                b.defaults(u, {
                    cancelable: !0,
                    ctrlKey: !1,
                    altKey: !1,
                    shiftKey: !1,
                    metaKey: !1,
                    keyCode: void 0,
                    charCode: void 0
                }),
                p(n, u.bubbles || !1, u.cancelable, window, u.ctrlKey, u.altKey, u.shiftKey, u.metaKey, u.keyCode, u.charCode);
                break
            }
        default:
            {
                c.initEvent(n, u.bubbles || !1, u.cancelable || !0);
                break
            }
        }
        b.defaults(c, a),
        e.dispatchEvent(c)
    },
    bind: function(e, n, o, a) {
        var u = a || !1;
        return e.addEventListener ? e.addEventListener(n, o, u) : e.attachEvent && e.attachEvent("on" + n, o),
        g
    },
    unbind: function(e, n, o, a) {
        var u = a || !1;
        return e.removeEventListener ? e.removeEventListener(n, o, u) : e.detachEvent && e.detachEvent("on" + n, o),
        g
    },
    addClass: function(e, n) {
        if (e.className === void 0)
            e.className = n;
        else if (e.className !== n) {
            var o = e.className.split(/ +/);
            o.indexOf(n) === -1 && (o.push(n),
            e.className = o.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""))
        }
        return g
    },
    removeClass: function(e, n) {
        if (n)
            if (e.className === n)
                e.removeAttribute("class");
            else {
                var o = e.className.split(/ +/)
                  , a = o.indexOf(n);
                a !== -1 && (o.splice(a, 1),
                e.className = o.join(" "))
            }
        else
            e.className = void 0;
        return g
    },
    hasClass: function(e, n) {
        return new RegExp("(?:^|\\s+)" + n + "(?:\\s+|$)").test(e.className) || !1
    },
    getWidth: function(e) {
        var n = getComputedStyle(e);
        return re(n["border-left-width"]) + re(n["border-right-width"]) + re(n["padding-left"]) + re(n["padding-right"]) + re(n.width)
    },
    getHeight: function(e) {
        var n = getComputedStyle(e);
        return re(n["border-top-width"]) + re(n["border-bottom-width"]) + re(n["padding-top"]) + re(n["padding-bottom"]) + re(n.height)
    },
    getOffset: function(e) {
        var n = e
          , o = {
            left: 0,
            top: 0
        };
        if (n.offsetParent)
            do
                o.left += n.offsetLeft,
                o.top += n.offsetTop,
                n = n.offsetParent;
            while (n);
        return o
    },
    isActive: function(e) {
        return e === document.activeElement && (e.type || e.href)
    }
}
  , an = function(i) {
    se(e, i);
    function e(n, o) {
        Z(this, e);
        var a = oe(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, n, o))
          , u = a;
        a.__prev = a.getValue(),
        a.__checkbox = document.createElement("input"),
        a.__checkbox.setAttribute("type", "checkbox");
        function r() {
            u.setValue(!u.__prev)
        }
        return g.bind(a.__checkbox, "change", r, !1),
        a.domElement.appendChild(a.__checkbox),
        a.updateDisplay(),
        a
    }
    return ee(e, [{
        key: "setValue",
        value: function(o) {
            var a = ie(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setValue", this).call(this, o);
            return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()),
            this.__prev = this.getValue(),
            a
        }
    }, {
        key: "updateDisplay",
        value: function() {
            return this.getValue() === !0 ? (this.__checkbox.setAttribute("checked", "checked"),
            this.__checkbox.checked = !0,
            this.__prev = !0) : (this.__checkbox.checked = !1,
            this.__prev = !1),
            ie(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this)
        }
    }]),
    e
}(le)
  , Qn = function(i) {
    se(e, i);
    function e(n, o, a) {
        Z(this, e);
        var u = oe(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, n, o))
          , r = a
          , c = u;
        if (u.__select = document.createElement("select"),
        b.isArray(r)) {
            var l = {};
            b.each(r, function(t) {
                l[t] = t
            }),
            r = l
        }
        return b.each(r, function(t, p) {
            var m = document.createElement("option");
            m.innerHTML = p,
            m.setAttribute("value", t),
            c.__select.appendChild(m)
        }),
        u.updateDisplay(),
        g.bind(u.__select, "change", function() {
            var t = this.options[this.selectedIndex].value;
            c.setValue(t)
        }),
        u.domElement.appendChild(u.__select),
        u
    }
    return ee(e, [{
        key: "setValue",
        value: function(o) {
            var a = ie(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setValue", this).call(this, o);
            return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()),
            a
        }
    }, {
        key: "updateDisplay",
        value: function() {
            return g.isActive(this.__select) ? this : (this.__select.value = this.getValue(),
            ie(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this))
        }
    }]),
    e
}(le)
  , Zn = function(i) {
    se(e, i);
    function e(n, o) {
        Z(this, e);
        var a = oe(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, n, o))
          , u = a;
        function r() {
            u.setValue(u.__input.value)
        }
        function c() {
            u.__onFinishChange && u.__onFinishChange.call(u, u.getValue())
        }
        return a.__input = document.createElement("input"),
        a.__input.setAttribute("type", "text"),
        g.bind(a.__input, "keyup", r),
        g.bind(a.__input, "change", r),
        g.bind(a.__input, "blur", c),
        g.bind(a.__input, "keydown", function(l) {
            l.keyCode === 13 && this.blur()
        }),
        a.updateDisplay(),
        a.domElement.appendChild(a.__input),
        a
    }
    return ee(e, [{
        key: "updateDisplay",
        value: function() {
            return g.isActive(this.__input) || (this.__input.value = this.getValue()),
            ie(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this)
        }
    }]),
    e
}(le);
function Xt(i) {
    var e = i.toString();
    return e.indexOf(".") > -1 ? e.length - e.indexOf(".") - 1 : 0
}
var ln = function(i) {
    se(e, i);
    function e(n, o, a) {
        Z(this, e);
        var u = oe(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, n, o))
          , r = a || {};
        return u.__min = r.min,
        u.__max = r.max,
        u.__step = r.step,
        b.isUndefined(u.__step) ? u.initialValue === 0 ? u.__impliedStep = 1 : u.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(u.initialValue)) / Math.LN10)) / 10 : u.__impliedStep = u.__step,
        u.__precision = Xt(u.__impliedStep),
        u
    }
    return ee(e, [{
        key: "setValue",
        value: function(o) {
            var a = o;
            return this.__min !== void 0 && a < this.__min ? a = this.__min : this.__max !== void 0 && a > this.__max && (a = this.__max),
            this.__step !== void 0 && a % this.__step !== 0 && (a = Math.round(a / this.__step) * this.__step),
            ie(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setValue", this).call(this, a)
        }
    }, {
        key: "min",
        value: function(o) {
            return this.__min = o,
            this
        }
    }, {
        key: "max",
        value: function(o) {
            return this.__max = o,
            this
        }
    }, {
        key: "step",
        value: function(o) {
            return this.__step = o,
            this.__impliedStep = o,
            this.__precision = Xt(o),
            this
        }
    }]),
    e
}(le);
function er(i, e) {
    var n = Math.pow(10, e);
    return Math.round(i * n) / n
}
var Pe = function(i) {
    se(e, i);
    function e(n, o, a) {
        Z(this, e);
        var u = oe(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, n, o, a));
        u.__truncationSuspended = !1;
        var r = u
          , c = void 0;
        function l() {
            var S = parseFloat(r.__input.value);
            b.isNaN(S) || r.setValue(S)
        }
        function t() {
            r.__onFinishChange && r.__onFinishChange.call(r, r.getValue())
        }
        function p() {
            t()
        }
        function m(S) {
            var x = c - S.clientY;
            r.setValue(r.getValue() + x * r.__impliedStep),
            c = S.clientY
        }
        function h() {
            g.unbind(window, "mousemove", m),
            g.unbind(window, "mouseup", h),
            t()
        }
        function y(S) {
            g.bind(window, "mousemove", m),
            g.bind(window, "mouseup", h),
            c = S.clientY
        }
        return u.__input = document.createElement("input"),
        u.__input.setAttribute("type", "text"),
        g.bind(u.__input, "change", l),
        g.bind(u.__input, "blur", p),
        g.bind(u.__input, "mousedown", y),
        g.bind(u.__input, "keydown", function(S) {
            S.keyCode === 13 && (r.__truncationSuspended = !0,
            this.blur(),
            r.__truncationSuspended = !1,
            t())
        }),
        u.updateDisplay(),
        u.domElement.appendChild(u.__input),
        u
    }
    return ee(e, [{
        key: "updateDisplay",
        value: function() {
            return this.__input.value = this.__truncationSuspended ? this.getValue() : er(this.getValue(), this.__precision),
            ie(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this)
        }
    }]),
    e
}(ln);
function Wt(i, e, n, o, a) {
    return o + (a - o) * ((i - e) / (n - e))
}
var rt = function(i) {
    se(e, i);
    function e(n, o, a, u, r) {
        Z(this, e);
        var c = oe(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, n, o, {
            min: a,
            max: u,
            step: r
        }))
          , l = c;
        c.__background = document.createElement("div"),
        c.__foreground = document.createElement("div"),
        g.bind(c.__background, "mousedown", t),
        g.bind(c.__background, "touchstart", h),
        g.addClass(c.__background, "slider"),
        g.addClass(c.__foreground, "slider-fg");
        function t(x) {
            document.activeElement.blur(),
            g.bind(window, "mousemove", p),
            g.bind(window, "mouseup", m),
            p(x)
        }
        function p(x) {
            x.preventDefault();
            var E = l.__background.getBoundingClientRect();
            return l.setValue(Wt(x.clientX, E.left, E.right, l.__min, l.__max)),
            !1
        }
        function m() {
            g.unbind(window, "mousemove", p),
            g.unbind(window, "mouseup", m),
            l.__onFinishChange && l.__onFinishChange.call(l, l.getValue())
        }
        function h(x) {
            x.touches.length === 1 && (g.bind(window, "touchmove", y),
            g.bind(window, "touchend", S),
            y(x))
        }
        function y(x) {
            var E = x.touches[0].clientX
              , R = l.__background.getBoundingClientRect();
            l.setValue(Wt(E, R.left, R.right, l.__min, l.__max))
        }
        function S() {
            g.unbind(window, "touchmove", y),
            g.unbind(window, "touchend", S),
            l.__onFinishChange && l.__onFinishChange.call(l, l.getValue())
        }
        return c.updateDisplay(),
        c.__background.appendChild(c.__foreground),
        c.domElement.appendChild(c.__background),
        c
    }
    return ee(e, [{
        key: "updateDisplay",
        value: function() {
            var o = (this.getValue() - this.__min) / (this.__max - this.__min);
            return this.__foreground.style.width = o * 100 + "%",
            ie(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this)
        }
    }]),
    e
}(ln)
  , un = function(i) {
    se(e, i);
    function e(n, o, a) {
        Z(this, e);
        var u = oe(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, n, o))
          , r = u;
        return u.__button = document.createElement("div"),
        u.__button.innerHTML = a === void 0 ? "Fire" : a,
        g.bind(u.__button, "click", function(c) {
            return c.preventDefault(),
            r.fire(),
            !1
        }),
        g.addClass(u.__button, "button"),
        u.domElement.appendChild(u.__button),
        u
    }
    return ee(e, [{
        key: "fire",
        value: function() {
            this.__onChange && this.__onChange.call(this),
            this.getValue().call(this.object),
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue())
        }
    }]),
    e
}(le)
  , it = function(i) {
    se(e, i);
    function e(n, o) {
        Z(this, e);
        var a = oe(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, n, o));
        a.__color = new W(a.getValue()),
        a.__temp = new W(0);
        var u = a;
        a.domElement = document.createElement("div"),
        g.makeSelectable(a.domElement, !1),
        a.__selector = document.createElement("div"),
        a.__selector.className = "selector",
        a.__saturation_field = document.createElement("div"),
        a.__saturation_field.className = "saturation-field",
        a.__field_knob = document.createElement("div"),
        a.__field_knob.className = "field-knob",
        a.__field_knob_border = "2px solid ",
        a.__hue_knob = document.createElement("div"),
        a.__hue_knob.className = "hue-knob",
        a.__hue_field = document.createElement("div"),
        a.__hue_field.className = "hue-field",
        a.__input = document.createElement("input"),
        a.__input.type = "text",
        a.__input_textShadow = "0 1px 1px ",
        g.bind(a.__input, "keydown", function(x) {
            x.keyCode === 13 && m.call(this)
        }),
        g.bind(a.__input, "blur", m),
        g.bind(a.__selector, "mousedown", function() {
            g.addClass(this, "drag").bind(window, "mouseup", function() {
                g.removeClass(u.__selector, "drag")
            })
        }),
        g.bind(a.__selector, "touchstart", function() {
            g.addClass(this, "drag").bind(window, "touchend", function() {
                g.removeClass(u.__selector, "drag")
            })
        });
        var r = document.createElement("div");
        b.extend(a.__selector.style, {
            width: "122px",
            height: "102px",
            padding: "3px",
            backgroundColor: "#222",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
        }),
        b.extend(a.__field_knob.style, {
            position: "absolute",
            width: "12px",
            height: "12px",
            border: a.__field_knob_border + (a.__color.v < .5 ? "#fff" : "#000"),
            boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
            borderRadius: "12px",
            zIndex: 1
        }),
        b.extend(a.__hue_knob.style, {
            position: "absolute",
            width: "15px",
            height: "2px",
            borderRight: "4px solid #fff",
            zIndex: 1
        }),
        b.extend(a.__saturation_field.style, {
            width: "100px",
            height: "100px",
            border: "1px solid #555",
            marginRight: "3px",
            display: "inline-block",
            cursor: "pointer"
        }),
        b.extend(r.style, {
            width: "100%",
            height: "100%",
            background: "none"
        }),
        Yt(r, "top", "rgba(0,0,0,0)", "#000"),
        b.extend(a.__hue_field.style, {
            width: "15px",
            height: "100px",
            border: "1px solid #555",
            cursor: "ns-resize",
            position: "absolute",
            top: "3px",
            right: "3px"
        }),
        nr(a.__hue_field),
        b.extend(a.__input.style, {
            outline: "none",
            textAlign: "center",
            color: "#fff",
            border: 0,
            fontWeight: "bold",
            textShadow: a.__input_textShadow + "rgba(0,0,0,0.7)"
        }),
        g.bind(a.__saturation_field, "mousedown", c),
        g.bind(a.__saturation_field, "touchstart", c),
        g.bind(a.__field_knob, "mousedown", c),
        g.bind(a.__field_knob, "touchstart", c),
        g.bind(a.__hue_field, "mousedown", l),
        g.bind(a.__hue_field, "touchstart", l);
        function c(x) {
            y(x),
            g.bind(window, "mousemove", y),
            g.bind(window, "touchmove", y),
            g.bind(window, "mouseup", t),
            g.bind(window, "touchend", t)
        }
        function l(x) {
            S(x),
            g.bind(window, "mousemove", S),
            g.bind(window, "touchmove", S),
            g.bind(window, "mouseup", p),
            g.bind(window, "touchend", p)
        }
        function t() {
            g.unbind(window, "mousemove", y),
            g.unbind(window, "touchmove", y),
            g.unbind(window, "mouseup", t),
            g.unbind(window, "touchend", t),
            h()
        }
        function p() {
            g.unbind(window, "mousemove", S),
            g.unbind(window, "touchmove", S),
            g.unbind(window, "mouseup", p),
            g.unbind(window, "touchend", p),
            h()
        }
        function m() {
            var x = nt(this.value);
            x !== !1 ? (u.__color.__state = x,
            u.setValue(u.__color.toOriginal())) : this.value = u.__color.toString()
        }
        function h() {
            u.__onFinishChange && u.__onFinishChange.call(u, u.__color.toOriginal())
        }
        a.__saturation_field.appendChild(r),
        a.__selector.appendChild(a.__field_knob),
        a.__selector.appendChild(a.__saturation_field),
        a.__selector.appendChild(a.__hue_field),
        a.__hue_field.appendChild(a.__hue_knob),
        a.domElement.appendChild(a.__input),
        a.domElement.appendChild(a.__selector),
        a.updateDisplay();
        function y(x) {
            x.type.indexOf("touch") === -1 && x.preventDefault();
            var E = u.__saturation_field.getBoundingClientRect()
              , R = x.touches && x.touches[0] || x
              , L = R.clientX
              , V = R.clientY
              , U = (L - E.left) / (E.right - E.left)
              , Y = 1 - (V - E.top) / (E.bottom - E.top);
            return Y > 1 ? Y = 1 : Y < 0 && (Y = 0),
            U > 1 ? U = 1 : U < 0 && (U = 0),
            u.__color.v = Y,
            u.__color.s = U,
            u.setValue(u.__color.toOriginal()),
            !1
        }
        function S(x) {
            x.type.indexOf("touch") === -1 && x.preventDefault();
            var E = u.__hue_field.getBoundingClientRect()
              , R = x.touches && x.touches[0] || x
              , L = R.clientY
              , V = 1 - (L - E.top) / (E.bottom - E.top);
            return V > 1 ? V = 1 : V < 0 && (V = 0),
            u.__color.h = V * 360,
            u.setValue(u.__color.toOriginal()),
            !1
        }
        return a
    }
    return ee(e, [{
        key: "updateDisplay",
        value: function() {
            var o = nt(this.getValue());
            if (o !== !1) {
                var a = !1;
                b.each(W.COMPONENTS, function(c) {
                    if (!b.isUndefined(o[c]) && !b.isUndefined(this.__color.__state[c]) && o[c] !== this.__color.__state[c])
                        return a = !0,
                        {}
                }, this),
                a && b.extend(this.__color.__state, o)
            }
            b.extend(this.__temp.__state, this.__color.__state),
            this.__temp.a = 1;
            var u = this.__color.v < .5 || this.__color.s > .5 ? 255 : 0
              , r = 255 - u;
            b.extend(this.__field_knob.style, {
                marginLeft: 100 * this.__color.s - 7 + "px",
                marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                backgroundColor: this.__temp.toHexString(),
                border: this.__field_knob_border + "rgb(" + u + "," + u + "," + u + ")"
            }),
            this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + "px",
            this.__temp.s = 1,
            this.__temp.v = 1,
            Yt(this.__saturation_field, "left", "#fff", this.__temp.toHexString()),
            this.__input.value = this.__color.toString(),
            b.extend(this.__input.style, {
                backgroundColor: this.__color.toHexString(),
                color: "rgb(" + u + "," + u + "," + u + ")",
                textShadow: this.__input_textShadow + "rgba(" + r + "," + r + "," + r + ",.7)"
            })
        }
    }]),
    e
}(le)
  , tr = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
function Yt(i, e, n, o) {
    i.style.background = "",
    b.each(tr, function(a) {
        i.style.cssText += "background: " + a + "linear-gradient(" + e + ", " + n + " 0%, " + o + " 100%); "
    })
}
function nr(i) {
    i.style.background = "",
    i.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",
    i.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",
    i.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",
    i.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",
    i.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"
}
var rr = {
    load: function(e, n) {
        var o = n || document
          , a = o.createElement("link");
        a.type = "text/css",
        a.rel = "stylesheet",
        a.href = e,
        o.getElementsByTagName("head")[0].appendChild(a)
    },
    inject: function(e, n) {
        var o = n || document
          , a = document.createElement("style");
        a.type = "text/css",
        a.innerHTML = e;
        var u = o.getElementsByTagName("head")[0];
        try {
            u.appendChild(a)
        } catch {}
    }
}
  , ir = `<div id="dg-save" class="dg dialogue">

  Here's the new load parameter for your <code>GUI</code>'s constructor:

  <textarea id="dg-new-constructor"></textarea>

  <div id="dg-save-locally">

    <input id="dg-local-storage" type="checkbox"/> Automatically save
    values to <code>localStorage</code> on exit.

    <div id="dg-local-explain">The values saved to <code>localStorage</code> will
      override those passed to <code>dat.GUI</code>'s constructor. This makes it
      easier to work incrementally, but <code>localStorage</code> is fragile,
      and your friends may not see the same values you do.

    </div>

  </div>

</div>`
  , sr = function(e, n) {
    var o = e[n];
    return b.isArray(arguments[2]) || b.isObject(arguments[2]) ? new Qn(e,n,arguments[2]) : b.isNumber(o) ? b.isNumber(arguments[2]) && b.isNumber(arguments[3]) ? b.isNumber(arguments[4]) ? new rt(e,n,arguments[2],arguments[3],arguments[4]) : new rt(e,n,arguments[2],arguments[3]) : b.isNumber(arguments[4]) ? new Pe(e,n,{
        min: arguments[2],
        max: arguments[3],
        step: arguments[4]
    }) : new Pe(e,n,{
        min: arguments[2],
        max: arguments[3]
    }) : b.isString(o) ? new Zn(e,n) : b.isFunction(o) ? new un(e,n,"") : b.isBoolean(o) ? new an(e,n) : null
};
function or(i) {
    setTimeout(i, 1e3 / 60)
}
var ar = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || or
  , lr = function() {
    function i() {
        Z(this, i),
        this.backgroundElement = document.createElement("div"),
        b.extend(this.backgroundElement.style, {
            backgroundColor: "rgba(0,0,0,0.8)",
            top: 0,
            left: 0,
            display: "none",
            zIndex: "1000",
            opacity: 0,
            WebkitTransition: "opacity 0.2s linear",
            transition: "opacity 0.2s linear"
        }),
        g.makeFullscreen(this.backgroundElement),
        this.backgroundElement.style.position = "fixed",
        this.domElement = document.createElement("div"),
        b.extend(this.domElement.style, {
            position: "fixed",
            display: "none",
            zIndex: "1001",
            opacity: 0,
            WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
            transition: "transform 0.2s ease-out, opacity 0.2s linear"
        }),
        document.body.appendChild(this.backgroundElement),
        document.body.appendChild(this.domElement);
        var e = this;
        g.bind(this.backgroundElement, "click", function() {
            e.hide()
        })
    }
    return ee(i, [{
        key: "show",
        value: function() {
            var n = this;
            this.backgroundElement.style.display = "block",
            this.domElement.style.display = "block",
            this.domElement.style.opacity = 0,
            this.domElement.style.webkitTransform = "scale(1.1)",
            this.layout(),
            b.defer(function() {
                n.backgroundElement.style.opacity = 1,
                n.domElement.style.opacity = 1,
                n.domElement.style.webkitTransform = "scale(1)"
            })
        }
    }, {
        key: "hide",
        value: function() {
            var n = this
              , o = function a() {
                n.domElement.style.display = "none",
                n.backgroundElement.style.display = "none",
                g.unbind(n.domElement, "webkitTransitionEnd", a),
                g.unbind(n.domElement, "transitionend", a),
                g.unbind(n.domElement, "oTransitionEnd", a)
            };
            g.bind(this.domElement, "webkitTransitionEnd", o),
            g.bind(this.domElement, "transitionend", o),
            g.bind(this.domElement, "oTransitionEnd", o),
            this.backgroundElement.style.opacity = 0,
            this.domElement.style.opacity = 0,
            this.domElement.style.webkitTransform = "scale(1.1)"
        }
    }, {
        key: "layout",
        value: function() {
            this.domElement.style.left = window.innerWidth / 2 - g.getWidth(this.domElement) / 2 + "px",
            this.domElement.style.top = window.innerHeight / 2 - g.getHeight(this.domElement) / 2 + "px"
        }
    }]),
    i
}()
  , ur = Wn(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);
rr.inject(ur);
var qt = "dg"
  , Kt = 72
  , Jt = 20
  , be = "Default"
  , _e = function() {
    try {
        return !!window.localStorage
    } catch {
        return !1
    }
}()
  , ge = void 0
  , Qt = !0
  , ue = void 0
  , tt = !1
  , dn = []
  , H = function i(e) {
    var n = this
      , o = e || {};
    this.domElement = document.createElement("div"),
    this.__ul = document.createElement("ul"),
    this.domElement.appendChild(this.__ul),
    g.addClass(this.domElement, qt),
    this.__folders = {},
    this.__controllers = [],
    this.__rememberedObjects = [],
    this.__rememberedObjectIndecesToControllers = [],
    this.__listening = [],
    o = b.defaults(o, {
        closeOnTop: !1,
        autoPlace: !0,
        width: i.DEFAULT_WIDTH
    }),
    o = b.defaults(o, {
        resizable: o.autoPlace,
        hideable: o.autoPlace
    }),
    b.isUndefined(o.load) ? o.load = {
        preset: be
    } : o.preset && (o.load.preset = o.preset),
    b.isUndefined(o.parent) && o.hideable && dn.push(this),
    o.resizable = b.isUndefined(o.parent) && o.resizable,
    o.autoPlace && b.isUndefined(o.scrollable) && (o.scrollable = !0);
    var a = _e && localStorage.getItem(de(this, "isLocal")) === "true"
      , u = void 0
      , r = void 0;
    if (Object.defineProperties(this, {
        parent: {
            get: function() {
                return o.parent
            }
        },
        scrollable: {
            get: function() {
                return o.scrollable
            }
        },
        autoPlace: {
            get: function() {
                return o.autoPlace
            }
        },
        closeOnTop: {
            get: function() {
                return o.closeOnTop
            }
        },
        preset: {
            get: function() {
                return n.parent ? n.getRoot().preset : o.load.preset
            },
            set: function(h) {
                n.parent ? n.getRoot().preset = h : o.load.preset = h,
                fr(this),
                n.revert()
            }
        },
        width: {
            get: function() {
                return o.width
            },
            set: function(h) {
                o.width = h,
                at(n, h)
            }
        },
        name: {
            get: function() {
                return o.name
            },
            set: function(h) {
                o.name = h,
                r && (r.innerHTML = o.name)
            }
        },
        closed: {
            get: function() {
                return o.closed
            },
            set: function(h) {
                o.closed = h,
                o.closed ? g.addClass(n.__ul, i.CLASS_CLOSED) : g.removeClass(n.__ul, i.CLASS_CLOSED),
                this.onResize(),
                n.__closeButton && (n.__closeButton.innerHTML = h ? i.TEXT_OPEN : i.TEXT_CLOSED)
            }
        },
        load: {
            get: function() {
                return o.load
            }
        },
        useLocalStorage: {
            get: function() {
                return a
            },
            set: function(h) {
                _e && (a = h,
                h ? g.bind(window, "unload", u) : g.unbind(window, "unload", u),
                localStorage.setItem(de(n, "isLocal"), h))
            }
        }
    }),
    b.isUndefined(o.parent)) {
        if (this.closed = o.closed || !1,
        g.addClass(this.domElement, i.CLASS_MAIN),
        g.makeSelectable(this.domElement, !1),
        _e && a) {
            n.useLocalStorage = !0;
            var c = localStorage.getItem(de(this, "gui"));
            c && (o.load = JSON.parse(c))
        }
        this.__closeButton = document.createElement("div"),
        this.__closeButton.innerHTML = i.TEXT_CLOSED,
        g.addClass(this.__closeButton, i.CLASS_CLOSE_BUTTON),
        o.closeOnTop ? (g.addClass(this.__closeButton, i.CLASS_CLOSE_TOP),
        this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0])) : (g.addClass(this.__closeButton, i.CLASS_CLOSE_BOTTOM),
        this.domElement.appendChild(this.__closeButton)),
        g.bind(this.__closeButton, "click", function() {
            n.closed = !n.closed
        })
    } else {
        o.closed === void 0 && (o.closed = !0);
        var l = document.createTextNode(o.name);
        g.addClass(l, "controller-name"),
        r = dt(n, l);
        var t = function(h) {
            return h.preventDefault(),
            n.closed = !n.closed,
            !1
        };
        g.addClass(this.__ul, i.CLASS_CLOSED),
        g.addClass(r, "title"),
        g.bind(r, "click", t),
        o.closed || (this.closed = !1)
    }
    o.autoPlace && (b.isUndefined(o.parent) && (Qt && (ue = document.createElement("div"),
    g.addClass(ue, qt),
    g.addClass(ue, i.CLASS_AUTO_PLACE_CONTAINER),
    document.body.appendChild(ue),
    Qt = !1),
    ue.appendChild(this.domElement),
    g.addClass(this.domElement, i.CLASS_AUTO_PLACE)),
    this.parent || at(n, o.width)),
    this.__resizeHandler = function() {
        n.onResizeDebounced()
    }
    ,
    g.bind(window, "resize", this.__resizeHandler),
    g.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler),
    g.bind(this.__ul, "transitionend", this.__resizeHandler),
    g.bind(this.__ul, "oTransitionEnd", this.__resizeHandler),
    this.onResize(),
    o.resizable && hr(this),
    u = function() {
        _e && localStorage.getItem(de(n, "isLocal")) === "true" && localStorage.setItem(de(n, "gui"), JSON.stringify(n.getSaveObject()))
    }
    ,
    this.saveToLocalStorageIfPossible = u;
    function p() {
        var m = n.getRoot();
        m.width += 1,
        b.defer(function() {
            m.width -= 1
        })
    }
    o.parent || p()
};
H.toggleHide = function() {
    tt = !tt,
    b.each(dn, function(i) {
        i.domElement.style.display = tt ? "none" : ""
    })
}
;
H.CLASS_AUTO_PLACE = "a";
H.CLASS_AUTO_PLACE_CONTAINER = "ac";
H.CLASS_MAIN = "main";
H.CLASS_CONTROLLER_ROW = "cr";
H.CLASS_TOO_TALL = "taller-than-window";
H.CLASS_CLOSED = "closed";
H.CLASS_CLOSE_BUTTON = "close-button";
H.CLASS_CLOSE_TOP = "close-top";
H.CLASS_CLOSE_BOTTOM = "close-bottom";
H.CLASS_DRAG = "drag";
H.DEFAULT_WIDTH = 245;
H.TEXT_CLOSED = "Close Controls";
H.TEXT_OPEN = "Open Controls";
H._keydownHandler = function(i) {
    document.activeElement.type !== "text" && (i.which === Kt || i.keyCode === Kt) && H.toggleHide()
}
;
g.bind(window, "keydown", H._keydownHandler, !1);
b.extend(H.prototype, {
    add: function(e, n) {
        return ve(this, e, n, {
            factoryArgs: Array.prototype.slice.call(arguments, 2)
        })
    },
    addColor: function(e, n) {
        return ve(this, e, n, {
            color: !0
        })
    },
    remove: function(e) {
        this.__ul.removeChild(e.__li),
        this.__controllers.splice(this.__controllers.indexOf(e), 1);
        var n = this;
        b.defer(function() {
            n.onResize()
        })
    },
    destroy: function() {
        if (this.parent)
            throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");
        this.autoPlace && ue.removeChild(this.domElement);
        var e = this;
        b.each(this.__folders, function(n) {
            e.removeFolder(n)
        }),
        g.unbind(window, "keydown", H._keydownHandler, !1),
        Zt(this)
    },
    addFolder: function(e) {
        if (this.__folders[e] !== void 0)
            throw new Error('You already have a folder in this GUI by the name "' + e + '"');
        var n = {
            name: e,
            parent: this
        };
        n.autoPlace = this.autoPlace,
        this.load && this.load.folders && this.load.folders[e] && (n.closed = this.load.folders[e].closed,
        n.load = this.load.folders[e]);
        var o = new H(n);
        this.__folders[e] = o;
        var a = dt(this, o.domElement);
        return g.addClass(a, "folder"),
        o
    },
    removeFolder: function(e) {
        this.__ul.removeChild(e.domElement.parentElement),
        delete this.__folders[e.name],
        this.load && this.load.folders && this.load.folders[e.name] && delete this.load.folders[e.name],
        Zt(e);
        var n = this;
        b.each(e.__folders, function(o) {
            e.removeFolder(o)
        }),
        b.defer(function() {
            n.onResize()
        })
    },
    open: function() {
        this.closed = !1
    },
    close: function() {
        this.closed = !0
    },
    hide: function() {
        this.domElement.style.display = "none"
    },
    show: function() {
        this.domElement.style.display = ""
    },
    onResize: function() {
        var e = this.getRoot();
        if (e.scrollable) {
            var n = g.getOffset(e.__ul).top
              , o = 0;
            b.each(e.__ul.childNodes, function(a) {
                e.autoPlace && a === e.__save_row || (o += g.getHeight(a))
            }),
            window.innerHeight - n - Jt < o ? (g.addClass(e.domElement, H.CLASS_TOO_TALL),
            e.__ul.style.height = window.innerHeight - n - Jt + "px") : (g.removeClass(e.domElement, H.CLASS_TOO_TALL),
            e.__ul.style.height = "auto")
        }
        e.__resize_handle && b.defer(function() {
            e.__resize_handle.style.height = e.__ul.offsetHeight + "px"
        }),
        e.__closeButton && (e.__closeButton.style.width = e.width + "px")
    },
    onResizeDebounced: b.debounce(function() {
        this.onResize()
    }, 50),
    remember: function() {
        if (b.isUndefined(ge) && (ge = new lr,
        ge.domElement.innerHTML = ir),
        this.parent)
            throw new Error("You can only call remember on a top level GUI.");
        var e = this;
        b.each(Array.prototype.slice.call(arguments), function(n) {
            e.__rememberedObjects.length === 0 && cr(e),
            e.__rememberedObjects.indexOf(n) === -1 && e.__rememberedObjects.push(n)
        }),
        this.autoPlace && at(this, this.width)
    },
    getRoot: function() {
        for (var e = this; e.parent; )
            e = e.parent;
        return e
    },
    getSaveObject: function() {
        var e = this.load;
        return e.closed = this.closed,
        this.__rememberedObjects.length > 0 && (e.preset = this.preset,
        e.remembered || (e.remembered = {}),
        e.remembered[this.preset] = Le(this)),
        e.folders = {},
        b.each(this.__folders, function(n, o) {
            e.folders[o] = n.getSaveObject()
        }),
        e
    },
    save: function() {
        this.load.remembered || (this.load.remembered = {}),
        this.load.remembered[this.preset] = Le(this),
        st(this, !1),
        this.saveToLocalStorageIfPossible()
    },
    saveAs: function(e) {
        this.load.remembered || (this.load.remembered = {},
        this.load.remembered[be] = Le(this, !0)),
        this.load.remembered[e] = Le(this),
        this.preset = e,
        ot(this, e, !0),
        this.saveToLocalStorageIfPossible()
    },
    revert: function(e) {
        b.each(this.__controllers, function(n) {
            this.getRoot().load.remembered ? cn(e || this.getRoot(), n) : n.setValue(n.initialValue),
            n.__onFinishChange && n.__onFinishChange.call(n, n.getValue())
        }, this),
        b.each(this.__folders, function(n) {
            n.revert(n)
        }),
        e || st(this.getRoot(), !1)
    },
    listen: function(e) {
        var n = this.__listening.length === 0;
        this.__listening.push(e),
        n && hn(this.__listening)
    },
    updateDisplay: function() {
        b.each(this.__controllers, function(e) {
            e.updateDisplay()
        }),
        b.each(this.__folders, function(e) {
            e.updateDisplay()
        })
    }
});
function dt(i, e, n) {
    var o = document.createElement("li");
    return e && o.appendChild(e),
    n ? i.__ul.insertBefore(o, n) : i.__ul.appendChild(o),
    i.onResize(),
    o
}
function Zt(i) {
    g.unbind(window, "resize", i.__resizeHandler),
    i.saveToLocalStorageIfPossible && g.unbind(window, "unload", i.saveToLocalStorageIfPossible)
}
function st(i, e) {
    var n = i.__preset_select[i.__preset_select.selectedIndex];
    e ? n.innerHTML = n.value + "*" : n.innerHTML = n.value
}
function dr(i, e, n) {
    if (n.__li = e,
    n.__gui = i,
    b.extend(n, {
        options: function(r) {
            if (arguments.length > 1) {
                var c = n.__li.nextElementSibling;
                return n.remove(),
                ve(i, n.object, n.property, {
                    before: c,
                    factoryArgs: [b.toArray(arguments)]
                })
            }
            if (b.isArray(r) || b.isObject(r)) {
                var l = n.__li.nextElementSibling;
                return n.remove(),
                ve(i, n.object, n.property, {
                    before: l,
                    factoryArgs: [r]
                })
            }
        },
        name: function(r) {
            return n.__li.firstElementChild.firstElementChild.innerHTML = r,
            n
        },
        listen: function() {
            return n.__gui.listen(n),
            n
        },
        remove: function() {
            return n.__gui.remove(n),
            n
        }
    }),
    n instanceof rt) {
        var o = new Pe(n.object,n.property,{
            min: n.__min,
            max: n.__max,
            step: n.__step
        });
        b.each(["updateDisplay", "onChange", "onFinishChange", "step", "min", "max"], function(u) {
            var r = n[u]
              , c = o[u];
            n[u] = o[u] = function() {
                var l = Array.prototype.slice.call(arguments);
                return c.apply(o, l),
                r.apply(n, l)
            }
        }),
        g.addClass(e, "has-slider"),
        n.domElement.insertBefore(o.domElement, n.domElement.firstElementChild)
    } else if (n instanceof Pe) {
        var a = function(r) {
            if (b.isNumber(n.__min) && b.isNumber(n.__max)) {
                var c = n.__li.firstElementChild.firstElementChild.innerHTML
                  , l = n.__gui.__listening.indexOf(n) > -1;
                n.remove();
                var t = ve(i, n.object, n.property, {
                    before: n.__li.nextElementSibling,
                    factoryArgs: [n.__min, n.__max, n.__step]
                });
                return t.name(c),
                l && t.listen(),
                t
            }
            return r
        };
        n.min = b.compose(a, n.min),
        n.max = b.compose(a, n.max)
    } else
        n instanceof an ? (g.bind(e, "click", function() {
            g.fakeEvent(n.__checkbox, "click")
        }),
        g.bind(n.__checkbox, "click", function(u) {
            u.stopPropagation()
        })) : n instanceof un ? (g.bind(e, "click", function() {
            g.fakeEvent(n.__button, "click")
        }),
        g.bind(e, "mouseover", function() {
            g.addClass(n.__button, "hover")
        }),
        g.bind(e, "mouseout", function() {
            g.removeClass(n.__button, "hover")
        })) : n instanceof it && (g.addClass(e, "color"),
        n.updateDisplay = b.compose(function(u) {
            return e.style.borderLeftColor = n.__color.toString(),
            u
        }, n.updateDisplay),
        n.updateDisplay());
    n.setValue = b.compose(function(u) {
        return i.getRoot().__preset_select && n.isModified() && st(i.getRoot(), !0),
        u
    }, n.setValue)
}
function cn(i, e) {
    var n = i.getRoot()
      , o = n.__rememberedObjects.indexOf(e.object);
    if (o !== -1) {
        var a = n.__rememberedObjectIndecesToControllers[o];
        if (a === void 0 && (a = {},
        n.__rememberedObjectIndecesToControllers[o] = a),
        a[e.property] = e,
        n.load && n.load.remembered) {
            var u = n.load.remembered
              , r = void 0;
            if (u[i.preset])
                r = u[i.preset];
            else if (u[be])
                r = u[be];
            else
                return;
            if (r[o] && r[o][e.property] !== void 0) {
                var c = r[o][e.property];
                e.initialValue = c,
                e.setValue(c)
            }
        }
    }
}
function ve(i, e, n, o) {
    if (e[n] === void 0)
        throw new Error('Object "' + e + '" has no property "' + n + '"');
    var a = void 0;
    if (o.color)
        a = new it(e,n);
    else {
        var u = [e, n].concat(o.factoryArgs);
        a = sr.apply(i, u)
    }
    o.before instanceof le && (o.before = o.before.__li),
    cn(i, a),
    g.addClass(a.domElement, "c");
    var r = document.createElement("span");
    g.addClass(r, "property-name"),
    r.innerHTML = a.property;
    var c = document.createElement("div");
    c.appendChild(r),
    c.appendChild(a.domElement);
    var l = dt(i, c, o.before);
    return g.addClass(l, H.CLASS_CONTROLLER_ROW),
    a instanceof it ? g.addClass(l, "color") : g.addClass(l, qn(a.getValue())),
    dr(i, l, a),
    i.__controllers.push(a),
    a
}
function de(i, e) {
    return document.location.href + "." + e
}
function ot(i, e, n) {
    var o = document.createElement("option");
    o.innerHTML = e,
    o.value = e,
    i.__preset_select.appendChild(o),
    n && (i.__preset_select.selectedIndex = i.__preset_select.length - 1)
}
function en(i, e) {
    e.style.display = i.useLocalStorage ? "block" : "none"
}
function cr(i) {
    var e = i.__save_row = document.createElement("li");
    g.addClass(i.domElement, "has-save"),
    i.__ul.insertBefore(e, i.__ul.firstChild),
    g.addClass(e, "save-row");
    var n = document.createElement("span");
    n.innerHTML = "&nbsp;",
    g.addClass(n, "button gears");
    var o = document.createElement("span");
    o.innerHTML = "Save",
    g.addClass(o, "button"),
    g.addClass(o, "save");
    var a = document.createElement("span");
    a.innerHTML = "New",
    g.addClass(a, "button"),
    g.addClass(a, "save-as");
    var u = document.createElement("span");
    u.innerHTML = "Revert",
    g.addClass(u, "button"),
    g.addClass(u, "revert");
    var r = i.__preset_select = document.createElement("select");
    if (i.load && i.load.remembered ? b.each(i.load.remembered, function(m, h) {
        ot(i, h, h === i.preset)
    }) : ot(i, be, !1),
    g.bind(r, "change", function() {
        for (var m = 0; m < i.__preset_select.length; m++)
            i.__preset_select[m].innerHTML = i.__preset_select[m].value;
        i.preset = this.value
    }),
    e.appendChild(r),
    e.appendChild(n),
    e.appendChild(o),
    e.appendChild(a),
    e.appendChild(u),
    _e) {
        var c = document.getElementById("dg-local-explain")
          , l = document.getElementById("dg-local-storage")
          , t = document.getElementById("dg-save-locally");
        t.style.display = "block",
        localStorage.getItem(de(i, "isLocal")) === "true" && l.setAttribute("checked", "checked"),
        en(i, c),
        g.bind(l, "change", function() {
            i.useLocalStorage = !i.useLocalStorage,
            en(i, c)
        })
    }
    var p = document.getElementById("dg-new-constructor");
    g.bind(p, "keydown", function(m) {
        m.metaKey && (m.which === 67 || m.keyCode === 67) && ge.hide()
    }),
    g.bind(n, "click", function() {
        p.innerHTML = JSON.stringify(i.getSaveObject(), void 0, 2),
        ge.show(),
        p.focus(),
        p.select()
    }),
    g.bind(o, "click", function() {
        i.save()
    }),
    g.bind(a, "click", function() {
        var m = prompt("Enter a new preset name.");
        m && i.saveAs(m)
    }),
    g.bind(u, "click", function() {
        i.revert()
    })
}
function hr(i) {
    var e = void 0;
    i.__resize_handle = document.createElement("div"),
    b.extend(i.__resize_handle.style, {
        width: "6px",
        marginLeft: "-3px",
        height: "200px",
        cursor: "ew-resize",
        position: "absolute"
    });
    function n(u) {
        return u.preventDefault(),
        i.width += e - u.clientX,
        i.onResize(),
        e = u.clientX,
        !1
    }
    function o() {
        g.removeClass(i.__closeButton, H.CLASS_DRAG),
        g.unbind(window, "mousemove", n),
        g.unbind(window, "mouseup", o)
    }
    function a(u) {
        return u.preventDefault(),
        e = u.clientX,
        g.addClass(i.__closeButton, H.CLASS_DRAG),
        g.bind(window, "mousemove", n),
        g.bind(window, "mouseup", o),
        !1
    }
    g.bind(i.__resize_handle, "mousedown", a),
    g.bind(i.__closeButton, "mousedown", a),
    i.domElement.insertBefore(i.__resize_handle, i.domElement.firstElementChild)
}
function at(i, e) {
    i.domElement.style.width = e + "px",
    i.__save_row && i.autoPlace && (i.__save_row.style.width = e + "px"),
    i.__closeButton && (i.__closeButton.style.width = e + "px")
}
function Le(i, e) {
    var n = {};
    return b.each(i.__rememberedObjects, function(o, a) {
        var u = {}
          , r = i.__rememberedObjectIndecesToControllers[a];
        b.each(r, function(c, l) {
            u[l] = e ? c.initialValue : c.getValue()
        }),
        n[a] = u
    }),
    n
}
function fr(i) {
    for (var e = 0; e < i.__preset_select.length; e++)
        i.__preset_select[e].value === i.preset && (i.__preset_select.selectedIndex = e)
}
function hn(i) {
    i.length !== 0 && ar.call(window, function() {
        hn(i)
    }),
    b.each(i, function(e) {
        e.updateDisplay()
    })
}
var pr = H;
const _r = ()=>{}
;
class mr {
    constructor(e) {
        this.gui = new pr({
            autoPlace: !0
        }),
        this.gui.domElement.parentElement.style.zIndex = 2,
        this.config = {
            enableShadows: !0,
            shadowTransparency: .8,
            lightIntensity: 2,
            suspendSimulation: !1,
            delay: 10,
            gravity: 1,
            mass: 1,
            friction: .8,
            restitution: 0,
            linearDamping: .5,
            angularDamping: .4,
            startingHeight: 8,
            settleTimeout: 3e3,
            spinForce: 6,
            throwForce: 5,
            scale: 7,
            themeColor: e.themeColor || "#0974E6",
            theme: e.themes || ["default"]
        },
        this.onUpdate = (e == null ? void 0 : e.onUpdate) || _r,
        this.init()
    }
    init() {
        const e = this.gui.addFolder("Physics");
        e.add(this.config, "gravity", 0, 10, 1).onChange(this.handleUpdate.bind(this)),
        e.add(this.config, "mass", 1, 20, 1).onChange(this.handleUpdate.bind(this)),
        e.add(this.config, "friction", 0, 1, .1).onChange(this.handleUpdate.bind(this)),
        e.add(this.config, "restitution", 0, 1, .1).onChange(this.handleUpdate.bind(this)),
        e.add(this.config, "linearDamping", 0, 1, .1).onChange(this.handleUpdate.bind(this)),
        e.add(this.config, "angularDamping", 0, 1, .1).onChange(this.handleUpdate.bind(this)),
        e.add(this.config, "spinForce", 0, 15, 1).onChange(this.handleUpdate.bind(this)),
        e.add(this.config, "throwForce", 0, 15, 1).onChange(this.handleUpdate.bind(this)),
        e.add(this.config, "startingHeight", 1, 65, 1).onChange(this.handleUpdate.bind(this)),
        e.add(this.config, "settleTimeout", 1e3, 2e4, 1e3).onChange(this.handleUpdate.bind(this)),
        e.open();
        const n = this.gui.addFolder("Rendering");
        n.add(this.config, "delay", 10, 500, 10).onChange(this.handleUpdate.bind(this)),
        n.add(this.config, "scale", 1, 10, .1).onChange(this.handleUpdate.bind(this)),
        this.themeSelect = n.add(this.config, "theme", this.config.theme).onChange(this.handleUpdate.bind(this)),
        this.themeColorPicker = n.addColor(this.config, "themeColor").onChange(this.handleUpdate.bind(this)),
        n.add(this.config, "enableShadows").onChange(this.handleUpdate.bind(this)),
        n.add(this.config, "shadowTransparency", 0, 1, .01).onChange(this.handleUpdate.bind(this)),
        n.add(this.config, "lightIntensity", 0, 5, .1).onChange(this.handleUpdate.bind(this)),
        n.add(this.config, "suspendSimulation").onChange(this.handleUpdate.bind(this)),
        n.open(),
        this.gui.close()
    }
    handleUpdate(e) {
        this.onUpdate(this.config)
    }
}
const ae = "/assets/polyhedral_dice-c7bfffdf.svg"
  , De = ()=>{}
  , tn = {
    d4: {
        count: 0
    },
    d6: {
        count: 0
    },
    d8: {
        count: 0
    },
    d10: {
        count: 0
    },
    d12: {
        count: 0
    },
    d20: {
        count: 0
    },
    d100: {
        count: 0
    }
};
function nn(i) {
    return JSON.parse(JSON.stringify(i))
}
class gr {
    constructor(e) {
        Ze(this, "notation", nn(tn));
        Ze(this, "DRP", new sn);
        this.target = e.target ? document.querySelector(e.target) : document.body,
        this.elem = this.elem = document.createRange().createContextualFragment(`
      <div class="dice-picker">
        <form>
          <div class="dice">
            <button value="d4"><img class="die" src="${ae}#d4_die" alt="d4" /></button>
            <button value="d6"><img class="die" src="${ae}#d6_die" alt="d6" /></button>
            <button value="d8"><img class="die" src="${ae}#d8_die" alt="d8" /></button>
            <button value="d10"><img class="die" src="${ae}#d10_die" alt="d10" /></button>
            <button value="d12"><img class="die" src="${ae}#d12_die" alt="d12" /></button>
            <button value="d20"><img class="die" src="${ae}#d20_die" alt="d20" /></button>
            <button value="d100"><img class="die" src="${ae}#d100_die" alt="d100" /></button>
          </div>
          <div class="output">click or tap dice icons to add to roll</div>
          <div class="action">
            <button type="reset">Clear</button>
            <button type="submit">Throw</button>
          </div>
        </form>
      </div>
    `),
        this.onSubmit = (e == null ? void 0 : e.onSubmit) || De,
        this.onClear = (e == null ? void 0 : e.onClear) || De,
        this.onReroll = (e == null ? void 0 : e.onReroll) || De,
        this.onResults = (e == null ? void 0 : e.onResults) || De,
        this.init()
    }
    init() {
        this.output = this.elem.querySelector(".output");
        const e = this.elem.querySelector("form");
        this.elem.querySelectorAll(".dice button").forEach(o=>o.addEventListener("click", a=>{
            a.preventDefault(),
            this.notation[o.value].count += 1,
            this.updateNotation()
        }
        )),
        e.addEventListener("submit", o=>{
            o.preventDefault(),
            this.onSubmit(this.DRP.parseNotation(this.output.innerHTML))
        }
        ),
        e.addEventListener("reset", o=>{
            o.preventDefault(),
            this.updateNotation(!0)
        }
        ),
        this.target.prepend(this.elem)
    }
    updateNotation(e) {
        let n = "";
        e ? (this.clear(),
        n = "click or tap dice icons to add to roll") : n = Object.entries(this.notation).reduce((o,[a,u])=>{
            let r = "";
            return o !== "" && (r = " + "),
            u.count === 0 ? o : o + r + u.count + a
        }
        , ""),
        this.output.innerHTML = n
    }
    setNotation(e={}) {
        this.notation = e,
        this.updateNotation()
    }
    clear() {
        this.notation = nn(tn),
        this.DRP.clear(),
        this.onClear()
    }
    handleResults(e) {
        const n = /[dD]\d+/i;
        e.forEach(r=>{
            typeof r.sides == "string" && r.sides.match(n) && (r.sides = parseInt(r.sides.substring(1))),
            r.rolls.forEach(c=>{
                typeof c.sides == "string" && c.sides.match(n) && (c.sides = parseInt(c.sides.substring(1)))
            }
            )
        }
        );
        const o = this.DRP.handleRerolls(e);
        if (o.length)
            return this.onReroll(o),
            o;
        const a = this.DRP.parsedNotation ? this.DRP.parseFinalResults(e) : e
          , u = new CustomEvent("resultsAvailable",{
            detail: a
        });
        return document.dispatchEvent(u),
        this.onResults(a),
        a
    }
}
let vr = "default"
  , J = new In("#dice-box",{
    assetPath: "/assets/dice-box/",
    theme: vr
})
  , me = !1;
J.init().then(async i=>{
    const e = new mr({
        themes: ["default", "rust", "smooth", "rock", "diceOfRolling", "diceOfRolling-fate", "blueGreenMetal", "genesys", "gemstone", "gemstoneMarble", "wooden"],
        themeColor: i.config.themeColor,
        onUpdate: c=>{
            J.updateConfig(c)
        }
    });
    e.themeSelect.setValue(i.config.theme),
    J.onThemeConfigLoaded = c=>{
        c.themeColor && e.themeColorPicker.setValue(c.themeColor)
    }
    ,
    J.onThemeLoaded = c=>{
        console.log("callback themeLoaded", c)
    }
    ;
    const n = new Gn("#dice-box")
      , o = new gr({
        target: "#rollers",
        onSubmit: c=>{
            o.onClear(),
            J.roll(c)
        }
        ,
        onClear: ()=>{
            n.clear(),
            J.clear()
        }
        ,
        onReroll: c=>{
            c.forEach(l=>J.add(l))
        }
        ,
        onResults: c=>{
            console.log("results", c),
            n.showResults(c)
        }
    })
      , a = new Xn({
        target: "#rollers",
        targetRollsCrit: !1,
        onSubmit: c=>{
            console.log("notation", c),
            J.roll(c)
        }
        ,
        onClear: ()=>{
            n.clear(),
            J.clear()
        }
        ,
        onReroll: c=>{
            J.add(c)
        }
        ,
        onResults: c=>{
            console.log("results", c),
            n.showResults(c)
        }
    })
      , u = document.querySelector(".adv-roller")
      , r = document.createRange().createContextualFragment(`
			<div id="rollNotes">
				<div class="footnote">* accepts <em>most</em> roll formats seen on <a href="https://wiki.roll20.net/Dice_Reference#Roll20_Dice_Specification" target="_blank">Roll 20 Dice Specification</a></div>
				<div class="footnote">Rolls for unavailable dice, such as '1d5', will use 'crypto.getRandomValues' fallback to generate truely random numbers</div>
				<div class="footnote">Fate rolls now supported with 'df' such as '6df'</div>
				<div class="footnote">10's die available as 'd%' or 'd00' such as '5d00'</div>
				<button id="closeNotes" data-toggle="false">hide notes</button>
			</div>
		`);
    u.append(r),
    document.getElementById("closeNotes").addEventListener("click", c=>{
        const l = c.target.dataset.toggle
          , t = document.querySelectorAll(".footnote");
        l === "false" ? (t.forEach(p=>p.style.display = "none"),
        c.target.innerText = "show notes",
        c.target.dataset.toggle = "true") : (t.forEach(p=>p.style.display = "block"),
        c.target.innerText = "hide notes",
        c.target.dataset.toggle = "false")
    }
    ),
    J.onRollComplete = c=>{
        console.log("roll results callback", JSON.parse(JSON.stringify(c))),
        me ? a.handleResults(c) : o.handleResults(c)
    }
    ,
    J.onRemoveComplete = c=>{}
    ,
    o.setNotation({
        d4: {
            count: 0
        },
        d6: {
            count: 0
        },
        d8: {
            count: 0
        },
        d10: {
            count: 0
        },
        d12: {
            count: 0
        },
        d20: {
            count: 1
        },
        d100: {
            count: 0
        }
    }),
    br(),
    yr()
}
);
function br() {
    const i = document.getElementById("toggleRoller")
      , e = document.querySelector(".adv-roller")
      , n = document.querySelector(".dice-picker");
    me ? e.classList.add("pt-current") : n.classList.add("pt-current")//,
    // i.addEventListener("click", o=>{
    //     o.preventDefault(),
    //     console.log("toggleRoller!"),
    //     me ? (e.classList.add("pt-rotateCubeBottomOut"),
    //     e.classList.remove("pt-rotateCubeBottomIn"),
    //     n.classList.add("pt-current"),
    //     n.classList.add("pt-rotateCubeBottomIn"),
    //     n.classList.remove("pt-rotateCubeBottomOut"),
    //     me = !1,
    //     setTimeout(()=>e.classList.remove("pt-current"), 600)) : (e.classList.add("pt-current"),
    //     e.classList.add("pt-rotateCubeBottomIn"),
    //     e.classList.remove("pt-rotateCubeBottomOut"),
    //     n.classList.add("pt-rotateCubeBottomOut"),
    //     n.classList.remove("pt-rotateCubeBottomIn"),
    //     me = !0,
    //     setTimeout(()=>n.classList.remove("pt-current"), 600))
    // }
    // )
}
function yr() {
    // document.getElementById("toggleVisibility").addEventListener("click", e=>{
    //     e.preventDefault(),
    //     console.log("toggle visibility!"),
    //     J.isVisible ? (J.hide(),
    //     console.log("Box is hidden")) : (J.show(),
    //     console.log("Box is visible"))
    // }
    // )
}
