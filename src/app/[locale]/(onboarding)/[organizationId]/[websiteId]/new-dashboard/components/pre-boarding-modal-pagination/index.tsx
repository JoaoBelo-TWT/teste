import classes from './index.module.css';

export const PreBoardingModalPagination = ({
  data,
  activeIndex,
  onClick
}: {
  data: { id: string }[];
  activeIndex: number;
  onClick: (index: number) => void;
}) => (
  <div className={classes['pre-boarding-modal-pagination']}>
    {data.map((item, index) => {
      const isActive = index === activeIndex;
      return (
        <span // NOSONAR
          tabIndex={-1}
          key={item.id}
          data-active={isActive}
          className={classes['pre-boarding-modal-pagination__item']}
          aria-label={`Go to step ${index + 1}`}
          onClick={() => onClick(index)}
        />
      );
    })}
  </div>
);
