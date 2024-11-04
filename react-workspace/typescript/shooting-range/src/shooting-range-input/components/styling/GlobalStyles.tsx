export const styles = {
    inputField: (isNormalComputer: boolean) => ({
        marginRight: '100px',
        width: isNormalComputer ? '100%' : '100%'
    }),
    shootingInput: (isNormalComputer: boolean) => ({
        marginTop: '10px',
        width: isNormalComputer ? 'unset' : '100%'
    }),
    labelComments: () => ({
        position: 'absolute' as React.CSSProperties["position"],
        top: '4px',
        left: '10px',
        fontSize: '12px',
        width: '100%',
        color: '#888',
        fontWeight: '400',
        fontFamily: "'Open Sans', Arial, sans-serif",
        zIndex: '1'
    }),
    inputComments: () => ({
        width: '100%',
        border: '1px solid #aaa',
        fontSize: '14px',
        paddingTop: '24px',
        height: '100px',
        borderRadius: '5px',
        paddingLeft: '10px',
        paddingBottom: '5px',
        fontWeight: 'bolder',
    }),
    emailLabel: () => ({
        position: 'absolute' as React.CSSProperties["position"],
        top: '4px',
        left: '10px',
        fontSize: '12px',
        width: '100%',
        color: '#888',
        fontWeight: '400',
        fontFamily: "'Open Sans', Arial, sans-serif",
        zIndex: '1'
    }),
    emailInputField: () => ({
        width: '100%',
        border: '1px solid #aaa',
        fontSize: '14px',
        paddingTop: '24px',
        height: '50px',
        borderRadius: '5px',
        paddingLeft: '10px',
        paddingBottom: '5px',
        fontWeight: 'bolder',
    }),
    checkBoxWrapper: (isNormalComputer: boolean)  => ({
        width: isNormalComputer ? 'unset' : '100%',
        margin: isNormalComputer ? 'unset' : '0 auto 0 auto'
    }),
    checkBox: (isNormalComputer: boolean)  => ({
        justifyContent: isNormalComputer ? 'unset' : 'center'
    })
}
