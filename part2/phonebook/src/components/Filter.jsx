import { useState } from "react";
export default function Filter({filtered, setFiltered}) {
    const handleFilterChange = (event) => {
        event.preventDefault()
        const filter = event.target.value
        setFiltered(filter)
    }
    return (
    <>
        <div>
            <form onSubmit={(event) => event.preventDefault()}>
                filter shown with <input value = {filtered} onChange={handleFilterChange}/>
            </form>
        </div>
    </>
    )
}