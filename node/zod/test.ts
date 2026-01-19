interface propDef {
    label: string;
    type: string;
    description: string;
}

interface inputDef extends propDef {
    props: object;
}

const input: inputDef = {
    label: "City",
    type: "string",
    description: "The city to get the weather for",
    props: {
        city: "Tokyo",
    },
}

const input2: propDef = {
    label: "Temperature",
    type: "number",
    description: "The temperature in Celsius",
}