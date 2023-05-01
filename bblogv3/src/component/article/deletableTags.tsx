export interface tagProps {
    tags: string[];
    delTags: Function;
}
const DelTags = ({ tags, delTags }: tagProps) => {
    return (
        <section className="tags flex border-gray-600">
            <section className="flex z-[999] flex-wrap">
                {tags.map((tag, idx) => (
                    <button
                        onClick={(e) => {
                            delTags(tag);
                        }}
                        key={idx}
                        className="pt-1 px-3 text-sm transition-all"
                    >
                        # {tag}
                    </button>
                ))}
            </section>
        </section>
    );
};

export default DelTags;
