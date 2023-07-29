/**
 *  The visual form that allows you to edit the ticket
 * 
 */

import { useState, useEffect } from "react"
import { useUpdateTicketMutation, useDeleteTicketMutation } from "./ticketsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditTicketForm = ({ ticket, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateTicket, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateTicketMutation()

    const [deleteTicket, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteTicketMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(ticket.title)
    const [text, setText] = useState(ticket.text)
    const [completed, setCompleted] = useState(ticket.completed)
    const [userId, setUserId] = useState(ticket.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/tickets')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveTicketClicked = async (e) => {
        if (canSave) {
            await updateTicket({ id: ticket.id, user: userId, title, text, completed })
        }
    }

    const onDeleteTicketClicked = async () => {
        await deleteTicket({ id: ticket.id })
    }

    const created = new Date(ticket.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(ticket.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteTicketClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

   /* Displayed content for Edit Ticket Form */
    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Ticket #{ticket.ticketId}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveTicketClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="ticket-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="ticket-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="ticket-text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="ticket-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="ticket-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="ticket-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="ticket-username">
                            ASSIGNED TO:</label>
                        <select
                            id="ticket-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditTicketForm