// eslint-disable-next-line react/prop-types
export default function ReferenceExampleComponent({ selectedStyle }) {
    return (
        <>
            {selectedStyle === "Chicago" && (
                <div className="w-3/4">
                    <span>
                        <strong>Example:</strong>
                    </span>
                    <p>
                        Last Name, Initials. <i>Title</i>. Publisher. Year.
                    </p>
                    <br />
                    <span>
                        <strong>In-Text Citation:</strong>
                    </span>
                    <p>^1.</p>
                    <br />
                    <span>
                        <strong>Reference Entry:</strong>
                    </span>
                    <p>
                        1. Smith, J. A. <i>The Handbook of Writing: A Comprehensive Guide</i>. Academic Publishers. (2021).
                    </p>
                </div>
            )}
            {selectedStyle === "APA" && (
                <div className="w-3/4">
                    <span>
                        <strong>Example:</strong>
                    </span>
                    <p>Last Name, Initials. (Year). Title. Publisher.</p>
                    <br />
                    <span>
                        <strong>In-Text Citation:</strong>
                    </span>
                    <p>(Author Last Name, Year)</p>
                    <br />
                    <span>
                        <strong>Reference Entry:</strong>
                    </span>
                    <p>Smith, J. A. (2021). The Handbook of Writing: A Comprehensive Guide. Academic Publishers.</p>
                </div>
            )}
            {selectedStyle === "MLA" && (
                <div className="w-3/4">
                    <span>
                        <strong>Example:</strong>
                    </span>
                    <p>
                        Last Name, Initials. <i>Title</i>. Publisher, Year.
                    </p>
                    <br />
                    <span>
                        <strong>In-Text Citation:</strong>
                    </span>
                    <p>(Author's Last Name Page Number)</p>
                    <br />
                    <span>
                        <strong>Reference Entry:</strong>
                    </span>
                    <p>
                        Smith, John A. <i>The Handbook of Writing</i>: A Comprehensive Guide. Academic Publishers, 2021.
                    </p>
                </div>
            )}
        </>
    );
}
