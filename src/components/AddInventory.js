import React from 'react';
import axios from 'commons/axios'
import { toast } from 'react-toastify'

class AddInventory extends React.Component {

    state = {
        name: '',
        // price not start with 0
        price: '',
        tags: '',
        image: '',
        status: ''
    } 

    initialState = {
        name: '',
        price: '',
        tags: '',
        image: '',
        status: ''
    }

    submit = e => {
        e.preventDefault();
        const product = { ...this.state }
        if (product.name === '' || product.price === '' || product.tags === '' || product.image === '' || product.status === '') {
            toast.warning('You miss some information!')
        } else {
            //  post to database
            axios.post('products', product).then(res => {
                console.log(res.data)
                // push to Products state, auto refresh page
                this.props.close(res.data)
                toast.success('You have successfully add product: ' + res.data.name + ' !')
                // reset empty
                this.setState(this.initialState)
            })
        }



    }

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="inventory">
                <p className="title has-text-centered">
                    Inventory
                </p>
                <form onSubmit={this.submit}>
                    <div className="field">
                        <div className="control">
                            <label className="label">Name</label>
                            <textarea className="textarea" name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Price</label>
                            <input type="number" className="input" name="price" value={this.state.price} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Tags</label>
                            <input type="text" className="input" name="tags" value={this.state.tags} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Image</label>
                            <input type="text" className="input" name="image" value={this.state.image} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Status</label>
                        <div className="select is-fullwidth">
                            <select name="status" value={this.state.status} onChange={this.handleChange}>
                                <option></option>
                                <option>available</option>
                                <option>unavailable</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            {/* type is button, it will not submit the form */}
                            <div className="button" type="button" onClick={() => { this.props.close() }}>Cancel</div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddInventory;