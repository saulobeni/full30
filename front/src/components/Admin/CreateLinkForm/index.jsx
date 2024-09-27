import Form from "@/components/Form";
import { useState } from "react";
import storage from "@/storage";

export default function CreateLinkForm() {
    const [label, setLabel] = useState("");
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    let productLinks = storage.getAccountLinks();
    console.log(productLinks)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const linkData = {
            label,
            url: link,
            title,
            description
        };

        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`http://localhost:3333/link/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify(linkData)
            });

            if (!response.ok) {
                throw new Error("Erro ao criar o link");
            }

            const result = await response.json();

            productLinks.push(result);
            storage.setAccountLinks(productLinks);

            setSuccess(true);
            setLabel("");
            setLink("");
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Erro ao enviar o link:", error);
            setError(error.message);
        }
    };

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Label</label>
                <input value={label} onChange={event => setLabel(event.target.value)} type="text" className="form-control" required />
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Link</label>
                <input value={link} onChange={event => setLink(event.target.value)} type="text" className="form-control" required />
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Titulo</label>
                <input value={title} onChange={event => setTitle(event.target.value)} type="text" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Descrição</label>
                <textarea value={description} onChange={event => setDescription(event.target.value)} className="form-control"></textarea>
            </div>
            <div>
                <button className="btn btn-dark w-100">Criar Link</button>
            </div>
            {error && <p className="text-danger mt-2">{error}</p>}
            {success && <p className="text-success mt-2">Link criado com sucesso!</p>}
        </Form>
    );
}
