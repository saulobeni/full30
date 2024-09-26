
export default function AdminSection({title, children, lastSection}) {
    return (
        <>
            <h4 className="mt-3">{title}</h4>
            <div className="row">
                {children}
            </div>
            { !Boolean(lastSection) && (<hr />) }
        </>
    )
}