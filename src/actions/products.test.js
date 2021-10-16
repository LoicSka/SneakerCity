const rewire = require("rewire")
const products = rewire("./products")
const fetchProducts = products.__get__("fetchProducts")
const fetchProduct = products.__get__("fetchProduct")
// @ponicode
describe("fetchProducts", () => {
    test("0", () => {
        let param3 = [["string", "number", "object", "array"], "number", ["string", "number", "object", "array"]]
        let callFunction = () => {
            fetchProducts(-5.48, true, param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param3 = ["object", "object", ["string", "number", "object", "array"]]
        let callFunction = () => {
            fetchProducts(1, true, param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param3 = [["string", "number", "object", "array"], ["string", "number", "object", "array"], ["string", "number", "object", "array"]]
        let callFunction = () => {
            fetchProducts(0, true, param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param3 = [["string", "number", "object", "array"], ["string", "number", "object", "array"], ["string", "number", "object", "array"]]
        let callFunction = () => {
            fetchProducts(1, false, param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param3 = [["string", "number", "object", "array"], ["string", "number", "object", "array"], "number"]
        let callFunction = () => {
            fetchProducts(100, false, param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetchProducts(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("products.loadPaginatedProducts", () => {
    test("0", () => {
        let callFunction = () => {
            products.loadPaginatedProducts({ key: "Elio" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            products.loadPaginatedProducts({ key: "Dillenberg" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            products.loadPaginatedProducts({ key: "elio@example.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            products.loadPaginatedProducts(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetchProduct", () => {
    test("0", () => {
        let callFunction = () => {
            fetchProduct("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetchProduct(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("products.loadProduct", () => {
    test("0", () => {
        let callFunction = () => {
            products.loadProduct("^5.0.0")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            products.loadProduct("4.0.0-beta1\t")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            products.loadProduct("v4.0.0-rc.4")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            products.loadProduct("v1.2.4")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            products.loadProduct("1.0.0")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            products.loadProduct(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
