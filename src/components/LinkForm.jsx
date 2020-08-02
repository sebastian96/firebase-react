import React, {useState, useEffect} from 'react';

const LinkForm = props => {

    const initialStateValues = {
        url: '', 
        name: '', 
        description: ''
    }

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEditWebsite(values);
        setValues({...initialStateValues});
    };

    useEffect(() => {
        if(props.currentId.length === 0) {
            setValues({...initialStateValues});
        } else {
            setValues(props.links.find(link => link.id === props.currentId));
        }
    }, [props.currentId])

    return (
        <div className="row">
            <div className="col col-md-12 p-4">
                <h2>{props.currentId === '' ? 'Add link' : 'Update link'}</h2>
                <form className="card card-body" onSubmit={handleSubmit}>
                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                            <i className="material-icons">insert_link</i>
                        </div>
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="https://someurl.com" 
                            name="url"
                            onChange={handleInputChange}
                            value={values.url}
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                            <i className="material-icons">create</i>
                        </div>
                        <input 
                            className="form-control"
                            placeholder="website name"
                            type="text"
                            name="name"
                            onChange={handleInputChange}
                            value={values.name}
                        />
                    </div>
                    <div className="form-group">
                        <textarea 
                            className="form-control" 
                            name="description" 
                            rows="3" 
                            placeholder="website description" 
                            onChange={handleInputChange}
                            value={values.description}
                        ></textarea>
                    </div>
                    <button className="btn btn-primary btn-block" type="submit">
                        {props.currentId === '' ? 'Save' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    )
};

export default LinkForm;