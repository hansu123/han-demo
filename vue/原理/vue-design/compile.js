class Compile {
    constructor(el, vm) {
        this.$el = document.querySelector(el);
        this.$vm = vm;
        if (this.$el) {
            this.$fragment = this.node2Fragment(this.$el)
            this.compile(this.$fragment)
            this.$el.appendChild(this.$fragment)
        }
    }

    node2Fragment(el) {
        let fragment = document.createDocumentFragment();
        let child;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment
    }
    isElementNode(el) {
        return el.nodeType == 1 ? true : false;
    }
    isTextNode(el) {
        return el.nodeType == 3 ? true : false;
    }
    compile(el) {
        let childNodes = el.childNodes;
        Array.from(childNodes).forEach((node) => {
            if (this.isElementNode(node)) {
                Array.from(node.attributes).forEach((attr) => {
                    let dir = attr.name.split('-')[1];
                    //h-model="ss"
                    if (dir === 'model') {
                        node.addEventListener("input", (e) => {
                            this.$vm[attr.value] = e.target.value;
                        })
                        this.update(node, this.$vm, attr.value, dir)
                    }
                    if (dir === 'on') {

                        this.handleAction(node, this.$vm, attr.value, dir)
                    }
                })
            }
            else if (this.isTextNode(node)) {
                let reg = /\{\{(.*)\}\}/ig;
                if (reg.test(node.nodeValue)) {
                    this.update(node, this.$vm, RegExp.$1, 'text')
                }
            }
            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }
    update(node, vm, key, dir) {
        let updateFn = this[dir + 'Updator'];
        updateFn && updateFn(node, vm[key])
        new Watcher(vm, key, (value) => {
            updateFn && updateFn(node, value)
        })
    }


    textUpdator(node, value) {
        node.nodeValue = value
    }
    modelUpdator(node, value) {
        console.dir(node)
        node.value = value

    }
    handleAction(node, vm, key, value) {
        let fn = vm.$options.methods[key].bind(vm);
        node.addEventListener('click', fn, false)
    }

}