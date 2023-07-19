type Target = Window | Document | HTMLElement

// TODO: KeyUp is not fired in a number of cases
// Class to reliably detect the currently pressed key combinations
class Detector {
    pressed: string[] = []
    target: Target
    update: (pressed: string[]) => void

    _boundKeydown: (ev: KeyboardEvent) => void
    _boundKeyup: (ev: KeyboardEvent) => void
    _boundBlur: (ev: FocusEvent) => void


    constructor(target: Target, update: (pressed: string[]) => void) {
        this.target = target
        this.update = update

        this._boundKeydown = this._handleKeydown.bind(this)
        this._boundKeyup = this._handleKeyup.bind(this)
        this._boundBlur = this._handleBlur.bind(this)

        window.addEventListener('keydown', this._boundKeydown)
        window.addEventListener('keyup', this._boundKeyup)
        window.addEventListener('blur', this._boundBlur)

        // TODO: Find a better solution to prevent problems with context menu
        window.addEventListener('contextmenu', this._boundBlur)
    }

    destroy() {
        window.removeEventListener('keydown', this._boundKeydown)
        window.removeEventListener('keyup', this._boundKeyup)
        window.removeEventListener('blur', this._boundBlur)
        window.removeEventListener('contextmenu', this._boundBlur)
    }

    _handleBlur() {
        this.pressed = []
        this.update(this.pressed)
    }

    _handleKeydown(ev: KeyboardEvent) {
        if (!ev.repeat) {
            this._addKey(ev.code)
        }
    }

    _handleKeyup(ev: KeyboardEvent) {
        this._removeKey(ev.code)
        this.update(this.pressed)
    }

    _addKey(code: string) {
        if (this.pressed.length === 0) {
            this.pressed.push(code);
        } else {
            this.pressed.every((_code, i) => {
                if (_code < code) {
                    this.pressed.splice(i + 1, 0, code)
                    return false
                } else {
                    this.pressed.splice(i, 0, code)
                    return false
                }
            })
        }
        this.update(this.pressed)
    }

    _removeKey(code: string) {
        this.pressed.every((_code, i) => {
            if (_code === code) {
                this.pressed.splice(i, 1);
                return false
            }
            return true
        })
        this.update(this.pressed)
    }

}

export default Detector;