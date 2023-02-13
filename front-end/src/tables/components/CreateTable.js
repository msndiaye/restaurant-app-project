import React, { useState } from "react"
import FormDataError from "../../errors/FormDataError"
import CreateTableForm from "../../reusecomponents/CreateTableForm"
import { create } from "../../services/create"
import { useHistory } from "react-router-dom"
function CreateTable() {

    const history = useHistory()
    const [tableFormData, setTableFormData] = useState({
        table_name: "",
        capacity: ""
    })

    const [error, setError] = useState(null)

    async function handleSubmitTableForm(e) {
        e.preventDefault()
        const { table_name, capacity } = tableFormData
        if (!table_name.trim() || table_name.length < 2) {
            setError("Please provide a table name with two or more characters long")
        } else if (!capacity || Number(capacity) <= 0 || Number.isNaN(Number(capacity))) {
            setError("There must be at one or more table")
        } else {
            try {
                const { error } = await create(tableFormData, "tables")
                if (error) {
                    throw error
                }
                history.push("/dashboard")

            } catch (error) { setError(error) }

        }


    }

    function handleTableDataChange({ target }) {

        setError(null)
        setTableFormData((tableFormData) => {

            return {
                ...tableFormData,
                [target.name]: target.name === "capacity" ? Number(target.value) : target.value
            }
        })

    }

    return (
        <>
            <CreateTableForm tableFormData={tableFormData}
                handleTableDataChange={handleTableDataChange}
                handleSubmitTableForm={handleSubmitTableForm} />
            <FormDataError error={error} />
        </>
    )
}





export default CreateTable