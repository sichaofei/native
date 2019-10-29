import size from './SizeHelper.js'
module.exports = {
    invite: {
        padding: 40,
        android:{
            backgroundColor: '#f8f8f8',
        }
    },
    inviteInfo: {
        backgroundColor: '#FFFFFF',
        shadowOffset: {x:0, y:10},
        shadowRadius: 15,
        shadowColor: '#D5D5D5',
        shadowOpacity: .5,
        borderRadius: 20,
        paddingTop: 60,
        paddingHorizontal: 60,
        paddingBottom: 72,
        marginBottom: 40,
        width: 670,
        alignItems: 'center',
        android: {
            borderColor: '#d8d8d8',
            borderWidth: 1
        },
    },
    inviteLogo: {
        width: 120,
        height: 119,
    },
    inviteTitle: {
        marginTop: 40,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleTxt: {
        fontFamily: 'PingFangHK-Medium',
        fontSize: 48,
        color: '#333333',
    },
    inviteTotal: {
        fontSize: 48,
        color: '#24AFE7',
    },
    inviteTips: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tipsTxt: {
        fontFamily: 'PingFangHK-Regular',
        fontSize: 24,
        color: '#4A4A4A',
    },
    inviteNo: {
        fontSize: 24,
        color: '#24AFE7',
    },
    inviteRules: {
        backgroundColor: '#FFFFFF',
        shadowOffset: {x:0, y:10},
        shadowRadius: 15,
        shadowColor: '#D5D5D5',
        shadowOpacity: .5,
        borderRadius: 20,
        paddingTop: 10,
        paddingRight: 60,
        paddingBottom: 40,
        paddingLeft: 50,
        width: 670,
        android: {
            borderColor: '#d8d8d8',
            borderWidth: 1
          },
    },
    inviteItem: {
        paddingVertical: 30,
        paddingHorizontal: 10,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 2,
    },
    itemTxt: {
        fontSize: 28,
        color: '#333333',
    },
    inviteBtn: {
        backgroundColor: '#1BC787',
        shadowOffset: {x:0, y:4},
        shadowRadius: 7,
        shadowColor: '#B5B5B5',
        shadowOpacity: .5,
        borderRadius: 100,
        width: 600,
        height: 98,
        textAlign: 'center',
        marginTop: 134,
        marginHorizontal: 40,
    },
    btnTxt: {
        height: 98,
        lineHeight: 98,
        fontFamily: 'PingFangTC-Medium',
        fontSize: 32,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    mask: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        width: 750,
        height: size.height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    copyPopup: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 75,
        position: 'absolute',
        width: 670,
        height: 419,
        alignItems: 'center',
    },
    copyTitle: {
        fontSize: 42,
        color: '#333333',
    },
    copySubtitle: {
        fontSize: 28,
        color: '#4A4A4A',
        marginTop: 22,
        marginBottom: 50,
    },
    copyBtn: {
        width: 360,
        height: 98,
        borderColor: '#1BC787',
        borderWidth: 2,
        borderRadius: 100,
    },
    copyTxt: {
        height: 98,
        lineHeight: 98,
        textAlign: 'center',
        fontSize: 32,
        color: '#1BC787',
    }
}