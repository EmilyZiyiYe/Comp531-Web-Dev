//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;(function(exports) {

'use strict'

function h(tag, props, ...children) {
    return { tag, props: props ? props : { }, 
        children: Array.isArray(children[0]) ? children[0] : children }
}
    
    
function createElement(node) {
	console.log('Create element called for', node)
	// create the element and return it to the caller
	// the node might have event listeners that need to be registered
	// the node might have children that need to be created as well
    if (typeof node === 'string'){
        var elem = document.createTextNode(node)
    }
    else {
        var elem = document.createElement(node.tag)
        if (node.props) {
            var keys = Object.keys(node.props)
            if (keys){
                 keys.forEach(function(key){
                    var attr = node.props[key]
                    if (key === "className"){
                        elem.setAttribute("class", attr)
                    }
                    else if(key === "onClick"){
                        function newHandler(e) {
                            attr(e)
                            update()
                        }
                        elem.addEventListener("click", newHandler)
                    }
                    else{
                         elem.setAttribute(key, attr)
                    }
                    
                })
            }
        }
        var childrens = node.children
        if (childrens){
            childrens.forEach(function(item){
                elem.appendChild(createElement(item))
            })
        }
    }
    
	return elem
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props && 
            	node1.props.id && node2.props.id && 
            	node1.props.id != node2.props.id)
}

function deepChanged(node1, node2){
    if ((!node1.children) || (!node2.children)){
        return changed(node1, node2)
    }
    
    if (!changed(node1, node2)){
        if (node1.children.length !== node2.children.length){
            return true
        }
        var flag = false
        node1.children.forEach(function(item,index){
            if (deepChanged(item, node2.children[index])){
                flag = true
            }
        })
        return flag
    }
    else{
        return true
    }
}
function updateElement(parent, newNode, oldNode, index=0) {
	// index will be needed when you traverse children
	// add the new node to the parent DOM element if
	// the new node is different from the old node 
	// at the same location in the DOM.
	// ideally we also handle inserts, but ignore that functionality for now.

    if (!oldNode) {
        parent.appendChild(createElement(newNode))
    } else {
    	console.log('update element that may have changed')
    	// you can use my changed(node1, node2) method above
    	// to determine if an element has changed or not
        if (!newNode){
            parent.removeChild(createElement(oldNode))
        }
        else if(deepChanged(newNode, oldNode)){
            parent.replaceChild(createElement(newNode), parent.childNodes[index])
        }
        
    	// be sure to also update the children!
    }
}

const deepCopy = (obj) => {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const props = {}
    if (obj.props) {
        for (let p in obj.props) {
            props[p] = obj.props[p]
        }
    }
    return h(obj.tag, props,
        Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
}

const update = () => requestAnimationFrame(() => {
	// compare the current vdom with the original vdom for updates
    updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
    h.mounted.original = deepCopy(h.mounted.current)
})

h.mount = (root, component) => {
    // we keep a copy of the original virtual DOM so we can diff it later for updates
    const originalComponent = deepCopy(component)
    h.mounted = { root: root, current: component, original: originalComponent }
    updateElement(root, originalComponent)
}

exports.h = h

})(window);