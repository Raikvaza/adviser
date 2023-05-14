// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const theme = {
    
}

const DonutChart = ({ data /* see data tab */ }) => (
    
    <ResponsivePie
        data={data}
        
        theme={{
            fontSize: 16,
           }}
        margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
        //sortByValue={true}
        innerRadius={0.6}
        outerRadius={0.95}
        skipAngle={10} // when to skip
        
        padAngle={1.7} // angle between pads
        cornerRadius={6}
        activeInnerRadiusOffset={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'category10' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsThickness={3}
        arcLinkLabelsTextColor= 'black'
        arcLinkLabelsColor={{ from: 'color' }}
        arcLinkLabelsSkipAngle={13} // When to not show a label
        arcLinkLabelsDiagonalLength ={16}
        arcLinkLabelsStraightLength = {20}

        arcLabelsRadiusOffset={0.5}
        arcLabelsSkipAngle={24}
        
        motionConfig="wobbly"
        // legends={[
        //     {
        //         anchor: 'bottom',
        //         direction: 'row',
        //         justify: false,
        //         translateX: 0,
        //         translateY: 69,
        //         itemsSpacing: 0,
        //         itemWidth: 108,
        //         itemHeight: 33,
        //         itemTextColor: 'black',
        //         itemDirection: 'left-to-right',
        //         itemOpacity: 1,
        //         symbolSize: 20,
        //         symbolShape: 'circle',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemTextColor: 'white'
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    />
)
export default DonutChart;