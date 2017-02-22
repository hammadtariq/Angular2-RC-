"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var CardComponent = (function () {
    function CardComponent() {
    }
    CardComponent.prototype.ngOnInit = function () {
        this.showDetails = false;
        this.count = 0;
        this.sideColor = this.getRandomColor();
    };
    CardComponent.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color.toString();
    };
    CardComponent.prototype.toggleDetails = function () {
        if (this.count % 2 == 0) {
            this.showDetails = true;
        }
        else {
            this.showDetails = false;
        }
        this.count++;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CardComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CardComponent.prototype, "created", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CardComponent.prototype, "updated", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CardComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CardComponent.prototype, "attempts", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CardComponent.prototype, "duration", void 0);
    CardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'card',
            templateUrl: 'card.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], CardComponent);
    return CardComponent;
}());
exports.CardComponent = CardComponent;
//# sourceMappingURL=card.component.js.map