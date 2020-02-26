import React from 'react'
import { ResponsivePie} from "@nivo/pie";
import styled from "styled-components";

const ChartContainer = styled.div`
    height: 300px;
`;

const colorSuccess = '#9ACD32';
const colorFailure = '#E30613';
const colorWarning = '#FFDB01';

const ChartPercentage = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    top: 109px;
    p {
        font-size: 1.8em;
        color: ${props => props.color};
    }
`;

const PieChart = ({ successPercentage, data }) => {

    let color = colorFailure;
    if (successPercentage >= 33)
        color = colorWarning
    if (successPercentage >= 66)
        color = colorSuccess

    return (
        <ChartContainer>
            <ChartPercentage
                color={color}
            >
                <p>{successPercentage}%</p>
            </ChartPercentage>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                sortByValue={true}
                innerRadius={0.60}
                padAngle={0.7}
                colors={data.map(c => c.color)}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                enableRadialLabels={false}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={11}
                slicesLabelsTextColor="#333333"
                enableSlicesLabels={false}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        translateY: 56,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </ChartContainer>
    )
}

export default PieChart;
