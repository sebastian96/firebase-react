import React, {useEffect, useState} from 'react';
import LinkForm from './LinkForm';
import {db} from '../firebase';
import swal from 'sweetalert';

const Link = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditWebsite = async (linkObject) => {
        if(currentId === '') {
            await db.collection('links').doc().set(linkObject);
            swal("Good job!", "You saved the link!", "success");
        } else {
            await db.collection('links').doc(currentId).update(linkObject);
            swal("Good job!", "You updated the link!", "success");
            setCurrentId([])
        }
    };

    const getLinks = () => {
        db.collection('links').onSnapshot(res => {
            const docs = [];
            res.forEach(link => {
                docs.push({...link.data(), id: link.id});
            })
            setLinks(docs);
        });
    }

    useEffect(() => {
        getLinks();
    }, []);

    const handleDeleteLink = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this link!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                db.collection('links').doc(id).delete();
                swal("Poof! Your link has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your link is safe!");
            }
        });
    };

    return (
        <>
            <LinkForm {...{addOrEditWebsite, currentId, links}} />
            <div className="row">
                <div className="col-md-12">
                    <h2>saved websites</h2>
                    <div className="d-flex flex-wrap justify-content-center">
                        {links.map((link) => (
                            <div className="card m-1" key={link.id}>
                                <div className="card-body">    
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3 className="mr-5">{link.name}</h3>
                                        <div className="ml-5">
                                            <button className="btn btn-warning mr-2" onClick={() => setCurrentId(link.id)}>
                                                <i className="material-icons">create</i>
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteLink(link.id)}>
                                                <i className="material-icons">close</i>
                                            </button>
                                        </div>
                                    </div>
                                    <p className="mt-1">{link.description}</p>
                                    <a className="btn btn-primary" href={link.url} target="_blank">Go to {link.name}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> 
            </div>
        </>
    )
};

export default Link;