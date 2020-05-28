var whitespace = new RegExp('\S', 'ig');
var euro = new RegExp('euro', 'ig');
var football = new RegExp('football', 'ig');

function doSomething(e, p) {
    console.log("element", e);
    console.log("parent", p);
    p.parentNode.removeChild(p);
}

function recurse(element) {
    if (element.childNodes.length > 0) {
        for (var i = 0; i < element.childNodes.length; i++) {
            recurse(element.childNodes[i]);
        }
    }

    if (element.nodeType == Node.TEXT_NODE && whitespace.test(element.nodeValue) && euro.test(element.nodeValue) && football.test(element.nodeValue)) {
        doSomething(element, element.parentNode);
    }
}

recurse(document.body);
