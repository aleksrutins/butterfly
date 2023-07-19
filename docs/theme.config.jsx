import { useRouter } from "next/router"

export default {
    logo: <strong>Butterfly</strong>,
    project: {
        link: 'https://github.com/aleksrutins/butterfly'
    },
    docsRepositoryBase: 'https://github.com/aleksrutins/butterfly/blob/main/docs/pages',
    footer: {
        text: (
            <span>
                MIT {new Date().getFullYear()} ©{' '}
                <a href="https://aleks.rutins.com" target="_blank">
                    Aleks Rūtiņš
                </a>
                .
            </span>
        )
    },
    useNextSeoProps() {
        const { asPath } = useRouter()
        if (asPath !== '/') {
            return {
                titleTemplate: '%s – Butterfly'
            }
        }
    }
}