import React from 'react'

const AutomatonManagement = () => {
    return (
        <div className="automaton-options mb-3">
                <div className="me-auto">
                    <Button variant="outline-light" className="buttons" onClick={() => console.log('Rename')}><i className="material-icons">edit</i> Rename</Button>
                    <Button variant="outline-light" className="buttons" onClick={() => console.log('Delete')}><i className="material-icons">delete</i> Delete</Button>
                </div>

                <div>
                    <Button variant="outline-light" className="buttons" onClick={() => saveCanvasPNG()}><i className="material-icons">collections</i> Export DFA to PNG</Button>
                    <Button variant="outline-light" className="buttons" onClick={() => console.log('Save Automaton')}><i className="material-icons">save</i> Save Automaton</Button>
                    <Button variant="outline-light" className="buttons" onClick={handleDfaModalOpen}><i className="material-icons">search</i> Search Automaton</Button>
                </div>
            </div>
    )
}

export default AutomatonManagement
