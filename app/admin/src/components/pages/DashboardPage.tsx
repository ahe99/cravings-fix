import { Card, DatePicker, Divider, Grid, theme } from 'antd'
import dayjs from 'dayjs'
import { Liquid, Column, TinyLine } from '@ant-design/charts'
import {
  ShoppingCartOutlined,
  FolderOutlined,
  DollarOutlined,
} from '@ant-design/icons'

import { useTrending } from '@/hooks'
import { DATE_FORMAT } from '@/helpers/date'
import { Bestseller, TrendingProduct } from '@/models/Trending'

import { Breadcrumbs } from '@/components/atoms'
import { TrendingProductsTable } from '@/components/organisms'

import CSS from './DashboardPage.module.css'

const { RangePicker } = DatePicker
const { useToken } = theme
const mock = {
  line: [
    {
      Date: '2023-08-01',
      profit: 468,
    },
    {
      Date: '2023-08-02',
      profit: 598,
    },
    {
      Date: '2023-08-03',
      profit: 356,
    },
    {
      Date: '2023-08-04',
      profit: 560,
    },
    {
      Date: '2023-08-05',
      profit: 510,
    },
    {
      Date: '2023-08-06',
      profit: 688,
    },
    {
      Date: '2023-08-07',
      profit: 670,
    },
    {
      Date: '2023-08-08',
      profit: 1403,
    },
    {
      Date: '2023-08-09',
      profit: 1258,
    },
  ],
  tiny: {
    revenue: [264, 417, 438, 887, 309, 397],
    orders: [264, 417, 438, 887, 309, 397],
    visitors: [264, 417, 438, 887, 309, 397],
    conversion: [264, 417, 438, 887, 309, 397],
  },
}

export const DashboardPage = () => {
  const {
    token: { colorSuccess, colorWarning, colorPrimary, colorError },
  } = useToken()

  const { bestsellerDataQuery, trendingProductQuery } = useTrending()

  return (
    <div className={CSS.dashboard_page}>
      <div className={CSS.header}>
        <Breadcrumbs />
        <RangePicker
          defaultValue={[
            dayjs('2023/08/01', DATE_FORMAT),
            dayjs('2023/08/20', DATE_FORMAT),
          ]}
          format={DATE_FORMAT}
        />
      </div>
      <div className={CSS.overview}>
        <TrendingCard
          values={mock.tiny.revenue}
          title="Revenue"
          description="$3,628"
          percentage={22}
          color={colorPrimary}
        />
        <TrendingCard
          values={mock.tiny.orders}
          title="Orders"
          description={840}
          percentage={-25}
          color={colorError}
        />
        <TrendingCard
          values={mock.tiny.visitors}
          title="Visitors"
          description="1,203"
          percentage={49}
          color={colorSuccess}
        />
        <TrendingCard
          values={mock.tiny.conversion}
          title="Conversion"
          description="28%"
          percentage={1.9}
          color={colorWarning}
        />
      </div>

      <div className={CSS.content}>
        <Card title="Orders Chart" className={CSS.orders_chart}>
          <Column
            data={mock.line}
            padding="auto"
            xField="Date"
            yField="profit"
            yAxis={{
              label: {
                formatter: (label) => `$${label}`,
              },
              tickInterval: 200,
            }}
          />
        </Card>
        <Card title="Cart">
          <Liquid
            percent={0.3}
            outline={{
              border: 4,
              distance: 8,
            }}
            wave={{
              length: 128,
            }}
          />
          <div style={{ display: 'flex', flexFlow: 'column' }}>
            <div
              style={{
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
              }}
            >
              <span>Abandoned Cart</span>
              <span>25</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
              }}
            >
              <span>Abandoned Revenue</span>
              <span>$3,267</span>
            </div>
          </div>
        </Card>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
          gap: '1rem',
        }}
      >
        <BestsellerCard bestseller={bestsellerDataQuery.data} />
        <TrendingItemsCard trendingItems={trendingProductQuery.data ?? []} />
      </div>
    </div>
  )
}

const TrendingItemsCard = ({
  trendingItems = [],
}: {
  trendingItems: TrendingProduct[]
}) => {
  return (
    <Card
      title="Trending Items"
      bodyStyle={{
        overflowX: 'auto',
      }}
    >
      <TrendingProductsTable trendingProducts={trendingItems} />
    </Card>
  )
}

const BestsellerCard = ({
  bestseller,
}: {
  bestseller: Bestseller | undefined
}) => {
  if (bestseller === undefined) {
    return <Card title="Bestsellers" />
  } else {
    return (
      <Card title="Bestsellers">
        <div className={CSS.bestseller_card_content}>
          <img
            className={CSS.bestseller_image}
            src={bestseller.images[0] ? bestseller.images[0].url : ''}
          />
          <div className={CSS.bestseller_name}>{bestseller.name}</div>
          <div className={CSS.bestseller_category}>
            {bestseller.category.name}
          </div>

          <Divider />
          <div className={CSS.bestseller_card_description}>
            <div>
              <span className={CSS.attributes}>
                <DollarOutlined />
                <span> </span>
                Price:
                <span> </span>
              </span>
              <span>{bestseller.price}$</span>
            </div>
            <div>
              <span className={CSS.attributes}>
                <FolderOutlined />
                <span> </span>
                In Stock:
                <span> </span>
              </span>
              <span>{bestseller.stockQuantity}</span>
            </div>
            <div>
              <span className={CSS.attributes}>
                <ShoppingCartOutlined />
                <span> </span>
                Sold:
                <span> </span>
              </span>
              <span>{bestseller.sold}</span>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

const TrendingCard = ({
  values = [],
  title = '',
  description = '',
  percentage = 0,
  color = '',
}: {
  values: number[]
  title: string
  description?: string | number
  percentage: number
  color?: string
}) => {
  const percentageLabel = percentage > 0 ? `+ ${percentage}%` : `${percentage}%`

  return (
    <Card>
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateColumns: 'repeat(2,minmax(0, 1fr))',
          gridTemplateRows: 'repeat(2,minmax(0, 1fr))',
          gap: '0.2rem',
        }}
      >
        <div
          style={{
            fontSize: '1.2rem',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: '1.2rem',
            fontWeight: 600,
          }}
        >
          {description}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            color,
          }}
        >
          <span>{percentageLabel}</span>
        </div>
        <TinyLine color={color} autoFit={false} data={values} smooth={true} />
      </div>
    </Card>
  )
}
