import { Optional } from "@yahvz01/monad";

interface MutableSet<_Tp, _CheckTp> extends Iterable<_Tp>{
    get( key : _CheckTp ) : Optional<_Tp>
    add( value : _Tp ) : this
    update( value : _Tp ) : this
    delete( key : _CheckTp ) : this
    clear() : this
    has( key : _CheckTp ) : boolean
}


class DistinctSet<_Tp, _CheckTp> implements MutableSet<_Tp, _CheckTp>{

    readonly container : Array<_Tp>
    readonly mapping : ( arg : _Tp) => _CheckTp
    get size() : number { return this.container.length }
    get length() : number { return this.container.length }

    constructor( mapping : ( original : _Tp) => _CheckTp, container : Array<_Tp> = [] ) {
        this.mapping = mapping
        this.container = container
    }

    get( key : _CheckTp ) : Optional<_Tp> {
        if(this.container.length > 0) {
            const result = this.container.find( item => this.hasKey(item, key))
            if(result)
                return Optional.of(result)
        }
        return Optional.empty()
    }

    add( value : _Tp ) : this {
        if( !this.has( this.mapping(value) ) ) {
            this.container.push(value);
        }
        return this;
    }

    update( value : _Tp ) : this {
        this.delete(this.mapping(value));
        this.container.push(value);
        return this;
    }


    delete( key : _CheckTp ) : this {
        const targetIdx = this.container.findIndex( item => this.hasKey(item, key) )
        if(targetIdx >= 0) {
            this.container.splice(targetIdx, 1)
        }
        return this;
    }

    clear() : this {
        this.container.splice(0, this.container.length)
        return this;
    }
    

    has( key : _CheckTp ) : boolean {
        if(this.container && this.container.length > 0 ) {
            if(this.container.find( item => this.hasKey(item, key))) {
                return true;
            }
        }
        return false;
    }

    

    [Symbol.iterator](): Iterator<_Tp, any, undefined> {
        return this.container[Symbol.iterator]();
    }

    
    private hasKey( target : _Tp, key : _CheckTp) {
        const mappedByKey = this.mapping(target)
        return deepEqual(mappedByKey, key);
    }
}

interface NotNullableObject { [key: string]: any };


function isNotNullableObject(obj: any): obj is NotNullableObject {
    return typeof obj === "object" && obj !== null;
  };


function deepEqual<_Tp>( lhs : _Tp, rhs : _Tp ) : boolean {
    if(lhs === rhs)
        return true;

    if( !isNotNullableObject(lhs) || !isNotNullableObject(rhs) )
        return false;

    const keyOflhs = Object.keys(lhs);
    const keyOfrhs = Object.keys(rhs);

    if(keyOflhs.length !== keyOfrhs.length)
        return false;
        
    for( const key of keyOflhs ) {
        if( !keyOfrhs.includes(key) || !deepEqual(lhs[key], rhs[key]))
            return false;
    }
    return true;
}

export { NotNullableObject, isNotNullableObject, DistinctSet, deepEqual }