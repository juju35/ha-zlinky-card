// ── DOM patching ─────────────────────────────────────────────────────────────
// Brings `from`'s children in line with `to`'s, position by position: nodes of the same kind are kept
// and updated (text, attributes, then their own children), the others are replaced, added or removed.
export function zlMorph(from, to) {
  var a = Array.from(from.childNodes), b = Array.from(to.childNodes);
  b.forEach((nb, i) => {
    var na = a[i];
    if (!na) { from.appendChild(nb); return; }
    if (na.nodeType !== nb.nodeType || na.nodeName !== nb.nodeName) { from.replaceChild(nb, na); return; }
    if (nb.nodeType !== 1) {
      if (na.nodeValue !== nb.nodeValue) na.nodeValue = nb.nodeValue;
      return;
    }
    Array.from(na.attributes).forEach((at) => { if (!nb.hasAttribute(at.name)) na.removeAttribute(at.name); });
    Array.from(nb.attributes).forEach((at) => { if (na.getAttribute(at.name) !== at.value) na.setAttribute(at.name, at.value); });
    // A custom element left empty by the template (ha-icon) owns its children: they are its own rendering, keep them.
    if (!nb.childNodes.length && (nb.localName || '').indexOf('-') > 0) return;
    zlMorph(na, nb);
  });
  for (var i = a.length - 1; i >= b.length; i--) from.removeChild(a[i]);
}
