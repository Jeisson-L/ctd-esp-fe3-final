import { render, screen } from "@testing-library/react";
import { faqsData } from "dh-marvel/components/faqs/faqsData";
import FaqsPage from "dh-marvel/pages/preguntas-frecuentes/index.page";

window.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(faqsData),
    })
) as jest.Mock;

describe("Home", () => {
    test("Debería renderizar las preguntas frecuentes", async () => {
        render(<FaqsPage faqs={faqsData} />);

        expect(screen.getByText("¿Se aceptan devoluciones?")).toBeInTheDocument();
        expect(screen.getByText("Nuestras compras aceptan devoluciones siempre y cuando el comic se encuentre en su envoltorio original, ya que de otra forma pierden el valor de reventa. Si desea devolverlo y se encuentra en las mismas condiciones en las que fue enviado, comuníquese con el 11-5555-0001 para resolver la devolución.")).toBeInTheDocument();
    });
});