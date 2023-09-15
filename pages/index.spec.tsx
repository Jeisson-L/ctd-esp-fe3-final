import { render, screen } from "@testing-library/react";
import Index from "dh-marvel/pages/index.page";
import { Data } from "interface/comic";
const data: Data = {
    offset: 0,
    limit: 0,
    total: 1,
    count: 0,
    results: []
}

describe('IndexPage', () => {
    describe('when rendering default', () => {
        it('should render the title', () => {
            render(<Index data={data} />)
            const title = screen.getByText('Marvel Store')
            expect(title).toBeInTheDocument()
        })
    })

})