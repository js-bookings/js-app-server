"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchGrant = exports.AccessRights = exports.EntityTS = exports.Entity = void 0;
/**
 *
 * @author Nicolas Minig
 */
class Entity {
}
exports.Entity = Entity;
class EntityTS extends Entity {
    constructor() {
        super(...arguments);
        this.createdAt = null; // null is important here to have the property exists
        this.updatedAt = null; // idem
    }
    timestamp() {
        if (!this.createdAt) {
            this.createdAt = new Date();
        }
        this.updatedAt = new Date();
    }
}
exports.EntityTS = EntityTS;
var AccessRights;
(function (AccessRights) {
    AccessRights["none"] = "none";
    AccessRights["read"] = "read";
    AccessRights["write"] = "write";
    AccessRights["all"] = "all";
})(AccessRights = exports.AccessRights || (exports.AccessRights = {}));
function matchGrant(requestGrant, existingGrants) {
    if (!requestGrant || !existingGrants) {
        return false;
    }
    for (let i = 0; existingGrants.length; i++) {
        const existingGrant = existingGrants[i];
        if (existingGrant.domain === requestGrant.domain ||
            existingGrant.domain === '*') {
            return (
            // All access
            existingGrant.right === AccessRights.all ||
                // Must match the rights
                existingGrant.right === requestGrant.right ||
                // Or, if write right is granted, this means the read right is accepted
                (existingGrant.right === AccessRights.write &&
                    requestGrant.right === AccessRights.read));
        }
    }
    return false; // False by default
}
exports.matchGrant = matchGrant;
//# sourceMappingURL=Interfaces.js.map