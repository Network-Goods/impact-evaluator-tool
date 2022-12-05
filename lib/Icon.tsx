export default function Icon({ icon }: { icon: string}) {
    return (
        <span className={`icon ${icon}`}>
            <Icon {...{icon}} />
        </span>
    );
}