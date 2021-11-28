import React, { useState, useMemo } from 'react';
import axios from 'commons/axios'
import { formatPrice } from 'commons/helper'

const CartItem = props => {
    const [amount, setAmount] = useState(props.cart.amount)
    const { id, name, image, price } = props.cart || {}
    const sumPrice = useMemo(() => {
        return formatPrice(amount * parseInt(price))
    }, [amount, price]);

    // handle change of number of cart item product
    const handleChange = e => {
        const _amount = parseInt(e.target.value)
        setAmount(_amount)
        const newCart = {
            ...props.cart,
            amount: _amount
        }
        axios.put(`/carts/${id}`, newCart).then(res => {
            props.updateCart(newCart)
        })

    }

    const deleteCart = () => {
        axios.delete(`/carts/${id}`).then(res => {
            props.deleteCart(props.cart);
        });
    };

    return (
        <div className="columns is-vcentered">
            <div className="column is-narrow" onClick={deleteCart}>
                <span className="close" >X</span>
            </div>
            <div className="column is-narrow">
                <img src={image} alt="" width="100" />
            </div>
            <div className="column cart-name is-narrow">
                {name}
            </div>
            <div className="column">
                <span className="price">
                    {formatPrice(price)}</span>
            </div>
            <div className="column">
                <input type="number"
                    className="input num-input"
                    defaultValue={amount}
                    min={1}
                    onChange={handleChange} />
            </div>
            <div className="column">
                <span className="sum-price">{sumPrice}</span>
            </div>
        </div>
    )
}

export default CartItem;