import { render, screen } from '@testing-library/react'
import { Faq } from './faq.component'
import { faqsData } from './faqsData'

describe('Pregunta frecuente', () => {
    describe('Renderizar una pregunta frecuente ', () => {
        it('deberia mostrar el texto de la pregunta', () => {
            render(<Faq faqData={faqsData[2]} />)
            const answer = screen.getByText('¿Cuanto demoran las entregas?')
            expect(answer).toBeInTheDocument()
        })
        it('deberia mostrar el texto de la respuesta', () => {
            render(<Faq faqData={faqsData[1]} />)
            const answer = screen.getByText('Lamentablemente nuestro sitio todavía no acepta reservas anticipadas. Pero nos encontramos trabajando en esa funcionalidad. Seguí nuestro twitter para estar al tanto de las ultimas novedades.')
            expect(answer).toBeInTheDocument()
        })
    })
})