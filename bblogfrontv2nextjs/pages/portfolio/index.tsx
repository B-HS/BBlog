import React from "react";
import PortfolioCard from "../../Components/Card/PortfolioCard";

const Portfolio = () => {
    return (
        <section className="portfolio_list grid grid-cols-fluid justify-items-center gap-6 p-2 mt-3">
            {Array.from({ length: 20 }).map((v, i) => (
                <PortfolioCard key={i} />
            ))}
        </section>
    );
};

export default Portfolio;
