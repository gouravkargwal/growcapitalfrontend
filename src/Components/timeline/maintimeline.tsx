import React from 'react';
import NewsCard from './newsCard';

const NewsList: React.FC = () => {
    const newsData = [
        {
            imageSrc: 'https://via.placeholder.com/150',
            source: 'Netflix',
            timeAgo: '12 minutes ago',
            title: "Where To Watch 'John Wick: Chapter 4'",
            description: "There's been no official announcement regarding John Wick-Chapter 4's streaming release. However, given it's a Lionsgate film, John Wick: Chapter 4 will eventually be released on Starz.",
            category: 'Movies',
            readTime: '4 min read',
        },
        {
            imageSrc: 'https://via.placeholder.com/150',
            source: 'HBO',
            timeAgo: '1 hour ago',
            title: "Game of Thrones Spin-Off: What We Know So Far",
            description: "HBO is planning to release multiple spin-offs of the hit show Game of Thrones. Here's what we know about the upcoming series.",
            category: 'Entertainment',
            readTime: '5 min read',
        },
        {
            imageSrc: 'https://via.placeholder.com/150',
            source: 'CNN',
            timeAgo: '3 hours ago',
            title: "Stock Market Volatility: What Investors Should Know",
            description: "The stock market has been highly volatile recently. Here's what investors should be doing to safeguard their portfolios.",
            category: 'Finance',
            readTime: '6 min read',
        },
        {
            imageSrc: 'https://via.placeholder.com/150',
            source: 'HBO',
            timeAgo: '1 hour ago',
            title: "Game of Thrones Spin-Off: What We Know So Far",
            description: "HBO is planning to release multiple spin-offs of the hit show Game of Thrones. Here's what we know about the upcoming series.",
            category: 'Entertainment',
            readTime: '5 min read',
        },
        {
            imageSrc: 'https://via.placeholder.com/150',
            source: 'HBO',
            timeAgo: '1 hour ago',
            title: "Game of Thrones Spin-Off: What We Know So Far",
            description: "HBO is planning to release multiple spin-offs of the hit show Game of Thrones. Here's what we know about the upcoming series.",
            category: 'Entertainment',
            readTime: '5 min read',
        },
    ];

    return (
        <div className="container mx-auto p-4">
            {newsData.map((newsItem, index) => (
                <NewsCard
                    key={index}
                    imageSrc={newsItem.imageSrc}
                    source={newsItem.source}
                    timeAgo={newsItem.timeAgo}
                    title={newsItem.title}
                    description={newsItem.description}
                    category={newsItem.category}
                    readTime={newsItem.readTime}
                />
            ))}
        </div>
    );
};

export default NewsList;
