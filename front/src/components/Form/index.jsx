
export default function Form({ action, method, onSubmit, className, children }) {
    return (
        <form 
            action={action} 
            method={method} 
            onSubmit={onSubmit} 
            className={className}>
            
            { children }
        </form>
    );
}